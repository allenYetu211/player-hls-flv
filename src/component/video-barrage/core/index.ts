/*
 * @Author: Allen OYang
 * @Date: 2021-07-20 09:48:26
 * @Descripttion: 
 * @LastEditTime: 2021-12-27 15:08:22
 * @FilePath: /ts-vp/src/component/video-barrage/core/index.ts
 */


import CanvasProxy from '@utils/canvas';
import { videoBarrageType } from '@g/index';
import { now } from '@utils/translateTime';

interface BarrageItemType {
  value: string;
  top: number;
  left: number;
  color: string;
  offset: number;
  width: number;
}

interface MsgItem {
  value: string;
  top?: number;
  left: number;
  color: string;
  speed: number;
  width?: number;
  addTime: number; // 刚添加到屏幕的时间戳
  originLeft: number; // 刚添加到屏幕的left值
}

interface CanvasProps extends videoBarrageType {
  element: HTMLCanvasElement;
  fontSize?: number;
  defaultBarrageState?: boolean;
  cacheData?: number;
}

interface canvas2D extends CanvasRenderingContext2D {
  webkitBackingStorePixelRatio?: any;
  mozBackingStorePixelRatio?: any;
  msBackingStorePixelRatio?: any;
  backingStorePixelRatio?: any;
  oBackingStorePixelRatio?: any;
}


let count = 0;
class BarrageCanvas extends CanvasProxy {
  private requestAnimationFrameId: any;
  private isRunning: boolean = false;
  private isClose: boolean = false;
  private tracks: MsgItem[][] = [];
  private tracksWidth: number[] = [];
  private tracksCounts: number = 0;
  private tracksLine: number = 5;
  private tracksConfig: Partial<CanvasProps> = {};
  private cacheMsg: any[] = [];
  private tracksState: boolean[] = [];

  constructor({
    element,
    fontSize = 22,
    defaultBarrageState,
    tracksLine: useTrackCount,
    trackSpacing = 50,
    textSpacing = 60,
    cacheData = 100,
  }: CanvasProps) {
    // TODO :参数 正数负数处理。
    super(element, fontSize);

    this.isClose = !defaultBarrageState;
    // 生成轨道数量
    this.tracksLine = useTrackCount || Math.floor(this.height / (fontSize! + 5));
    // 给到数量
    this.tracks = Array.from({ length: this.tracksLine }, () => []);
    // this.tracksIndex = Array.from({ length: this.tracksLine }, () => 0);
    this.tracksWidth = Array.from({ length: this.tracksLine }, () => 0);

    this.reSetTrackState();

    this.tracksConfig = {
      fontSize, defaultBarrageState, tracksLine: useTrackCount, trackSpacing, textSpacing, cacheData
    };
  }

  draw() {

    if (!this.isRunning) {
      return
    }


    this.ctx.clearRect(0, 0, this.width, this.height);

    // 根据内容展示
    this.tracks.forEach((track, index) => {

      if (track.length === 0) {
        this.tracksState[index] = true;
        return
      }

      track.forEach((msg, msgIndex) => {
        if (!msg) {
          return
        }
        const renderMsg = (width: number = 0) => {
          // 从添加到屏幕右侧边缘到现在的时间差值
          const timeDiff = now() - msg.addTime;
          // 弹幕向左侧的移动距离S ＝ V（速度）× T（时间）
          const distance = msg.speed * 0.05 * timeDiff;
          msg.left = msg.originLeft - distance;
          // msg.left = msg.left - msg.speed;
          this.ctx.fillStyle = msg.color;
          this.ctx.textAlign = "left";
          this.ctx.shadowOffsetX = 3;
          this.ctx.shadowOffsetY = 3;
          this.ctx.strokeStyle = "#000000";
          this.ctx.strokeText(msg.value, msg.left, index * this.tracksConfig.trackSpacing! + 50);
          this.ctx.fillText(msg.value, msg.left, index * this.tracksConfig.trackSpacing! + 50);
          // msg.width = this.ctx.measureText(msg.value).width * this.ratio;
          this.ctx.restore();
        }
        // console.log('msg.value === ', msg.value === '5 ：今天就是感恩节了，有个好消息告诉你！');

        // if (msg.value === '5 ：今天就是感恩节了，有个好消息告诉你！') {
        //   console.log('msg.left', msg.left);
        // }


        const currentLeft = msg.left + (msg.width || 0);
        // 检测当前弹幕是否已经滑动出去 , 如果是的，则进行删除。
        if (currentLeft <= 0) {
          delete track[msgIndex];
          this.tracksWidth[index] = this.tracksWidth[index] - (msg.width || 0);
          if (this.cacheMsg.length === 0) {
            window.cancelAnimationFrame(this.requestAnimationFrameId);
            this.isRunning = false;
            this.reSetTrackState();
          }
        }
        // 当前信息是否需已经全部展现, 如果全部展示则添加进来

        //  如果当前是轨道中最后一条，则检测是否展现完成
        if (msgIndex === track.length - 1 && currentLeft < this.width) {
          /**
            *  if current tracks state is true， then insert msg to tracks
            */
          if (this.cacheMsg.length !== 0) {
            const firstMsg = this.cacheMsg.shift()
            firstMsg.addTime = now();
            this.tracks[index].push(firstMsg);
          }
        }

        renderMsg();
      })
    })
  }

  start() {
    if (this.isClose) {
      return
    }
    this.isRunning = true;
    this.draw();
    this.requestAnimationFrameId = window.requestAnimationFrame(() => this.start());
  }

  cancelAnimationFrame() {
    window.cancelAnimationFrame(this.requestAnimationFrameId);
  }

  pushBarrage(item: {
    value: string,
    top?: number,
    left?: number,
    color?: string,
    speed?: number,
    viewableArea?: number
  }) {

    if (this.isClose || this.cacheMsg.length > this.tracksConfig.cacheData!) {
      return
    }

    /**
     * 添加一个缓存区
     * 记录每一条轨道的状态： 
     *  1. true 允许添加
     *  2. false 禁止添加
     *  
     * 状态改变：
     *  The last display of the current track is complete， false -> true
     *  or : true -> false
     */
    // 检查当前轨道是否存在可以运行的。
    const textWidth = this.ctx.measureText(item.value).width;

    const msg = {
      value: item.value,
      left: this.width + 10,
      originLeft: this.width + 10,
      color: item.color || '#fff',
      speed: item.speed || 5,
      width: textWidth,
      addTime: 0
    }


    let currentCanBeInsertedTracksIndex;
    for (let i = 0; i < this.tracksState.length; i++) {
      // find the first current track that can be inserted
      if (this.tracksState[i]) {
        currentCanBeInsertedTracksIndex = i;
        msg.addTime = now();
        this.tracks[i].push(msg);
        this.tracksState[i] = false;
        break;
      }
    }

    // 当前没有可以使用的tacks  则添加至缓冲区
    if (!currentCanBeInsertedTracksIndex && currentCanBeInsertedTracksIndex !== 0) {
      this.cacheMsg.push(msg);
    }

    if (this.isRunning) {
      return
    }
    this.start();
  }

  clean() {
    this.isClose = true;
    if (this.isRunning) {
      window.cancelAnimationFrame(this.requestAnimationFrameId);
      this.isRunning = false;
    }
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.tracks = Array.from({ length: this.tracksLine }, () => []);
    this.cacheMsg = [];
    this.reSetTrackState();
  }

  open() {
    this.isClose = false;
    this.start();
  }

  reSetTrackState() {
    //  轨道状态
    this.tracksState = Array.from({ length: this.tracksLine }, () => true);
  }

  restart() {
    if (!this.isClose) {
      this.clean();
      this.open()
    }
  }
}

export default BarrageCanvas;