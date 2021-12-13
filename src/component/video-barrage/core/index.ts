/*
 * @Author: Allen OYang
 * @Date: 2021-07-20 09:48:26
 * @Descripttion: 
 * @LastEditTime: 2021-12-13 14:16:16
 * @FilePath: /ts-vp/src/component/video-barrage/core/index.ts
 */


import CanvasProxy from '@utils/canvas';
import { videoBarrageType } from '@g/index';

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
}

interface CanvasProps extends videoBarrageType {
  element: HTMLCanvasElement;
  maxCache: number;
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


class BarrageCanvas extends CanvasProxy {

  private requestAnimationFrameId: any;
  private isRunning: boolean = false;
  private isClose: boolean = false;

  private tracks: MsgItem[][] = [];
  private tracksWidth: number[] = [];
  private tracksCounts: number = 0;
  private tracksLine: number = 5;

  private tracksConfig: Partial<CanvasProps> = {};

  private tracksIndex: number[] = [];
  private firstFlag: boolean = true;
  private trackPoint = {
    pointMinIndex: 0,
    pointMinLength: 0
  }



  constructor({
    element,
    maxCache = 100,
    fontSize = 22,
    defaultBarrageState,
    tracksLine: useTrackCount,
    trackSpacing = 50,
    textSpacing = 60,
    cacheData = 100,
  }: CanvasProps) {

    // TODO :参数 正数负数处理。
    super(element, fontSize);

    this.isClose = this.tracksConfig.defaultBarrageState!;
    // 生成轨道数量
    this.tracksLine = useTrackCount || Math.floor(this.height / (fontSize! + 5))
    // 给到数量
    this.tracks = Array.from({ length: this.tracksLine }, () => []);
    // this.tracksIndex = Array.from({ length: this.tracksLine }, () => 0);
    this.tracksWidth = Array.from({ length: this.tracksLine }, () => 0);

    this.tracksConfig = {
      fontSize, defaultBarrageState, tracksLine: useTrackCount, trackSpacing, textSpacing, cacheData
    };
  }

  draw() {

    if (!this.isRunning) {
      return
    }

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.save();

    // 根据内容展示
    this.tracks.forEach((track, index) => {
      track.forEach((msg, msgIndex) => {
        const renderMsg = (width: number = 0) => {
          msg.left = msg.left - msg.speed;
          this.ctx.shadowColor = msg.color;
          this.ctx.fillStyle = msg.color;
          this.ctx.textAlign = "left";
          this.ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
          this.ctx.shadowOffsetX = 3;
          this.ctx.shadowOffsetY = 3;

          this.ctx.strokeStyle = "#000000";
          this.ctx.strokeText(msg.value, msg.left, index * this.tracksConfig.trackSpacing! + 50);

          this.ctx.fillText(msg.value, msg.left, index * this.tracksConfig.trackSpacing! + 50);
          const text = this.ctx.measureText(msg.value);
          msg.width = text.width * this.ratio;
          this.ctx.restore();
        }
        // 检测当前弹幕是否已经滑动出去 , 如果是的，则进行删除。
        if (msg.left + (msg.width || 0) <= 0) {
          delete track[msgIndex];
          this.tracksCounts -= 1;
          if (this.tracksCounts === 0) {
            window.cancelAnimationFrame(this.requestAnimationFrameId);
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

  pushBarrage(item: {
    value: string,
    top?: number,
    left?: number,
    color?: string,
    speed?: number,
    viewableArea?: number
  }) {

    if (this.isClose || this.tracksCounts > this.tracksConfig.cacheData!) {
      return
    }

    const addTrackMsg = (currentTrack: MsgItem[], index: number, offsetValue: number = 0) => {
      this.tracksCounts += 1;
      // 每次添加，将指针默认指向下一一位（默认认为下一位为最小数）。
      // this.trackPoint.pointMinIndex = index + 1 <= this.tracks.length - 1 ? index + 1 : 0;

      const textWidth = this.ctx.measureText(item.value).width;
      // 添加每列宽度
      if (!this.tracksWidth[index]) {
        this.tracksWidth[index] = textWidth;
      } else {
        this.tracksWidth[index] = this.tracksWidth[index] + textWidth;
      }
      //  寻找宽度最小列
      const findMinIndex = () => {
        const minWidth = Math.min(...this.tracksWidth);
        this.trackPoint.pointMinIndex = this.tracksWidth.findIndex(item => item === minWidth)
      }

      findMinIndex();


      currentTrack.push({
        value: item.value,
        left: (item.left || offsetValue || this.width) + 10,
        // left: this.width + 10,
        color: item.color || '#fff',
        speed: item.speed || 5,
        width: textWidth
      })

    }
    /**
   * 检查当前列表最后一个内容是否都已经展现。
   * 如果为咱先则在下一个轨道内添加
   */

    // console.log('this.tracks', this.tracksCounts, this.tracks);

    for (let i = 0; i < this.tracks.length; i++) {
      const currentTrack = this.tracks[i];
      if (currentTrack.length !== 0) {
        const prevLastMSG = currentTrack[currentTrack.length - 1];
        //  判断轨道最后一条内容是否已经全部展现, 
        if (prevLastMSG && this.width >= (prevLastMSG.width || 0) + prevLastMSG.left) {
          addTrackMsg(currentTrack, i)
          break;
        }
        else {
          const { pointMinIndex } = this.trackPoint;
          // console.log('pointMinIndex', pointMinIndex);
          const currentTrackLastMSG = this.tracks[pointMinIndex][this.tracks[pointMinIndex].length - 1];
          let offsetValue = 0;
          if (currentTrackLastMSG) {
            // offsetValue = currentTrackLastMSG.width! + currentTrackLastMSG.left - this.width;
            offsetValue = currentTrackLastMSG.width! + currentTrackLastMSG.left + this.tracksConfig.textSpacing!;
          }
          addTrackMsg(this.tracks[pointMinIndex], pointMinIndex, offsetValue);
          break;
        }

      } else {
        addTrackMsg(currentTrack, i)
        break;
      }
    }

    if (this.isRunning) {
      return
    }
    this.start();
  }

  // resizeCanvas() {
  //   console.log('resizeCanvas')
  //   this.ctx.clearRect(0, 0, this.width, this.height)
  // }


  clean() {
    this.isClose = true;
    if (this.isRunning) {
      window.cancelAnimationFrame(this.requestAnimationFrameId);
      this.isRunning = false;
    }
    this.ctx.clearRect(0, 0, this.width, this.height)

    this.tracks = Array.from({ length: this.tracksLine }, () => []);
    this.tracksCounts = 0;
  }

  open() {
    this.isClose = false;
    this.start();
  }
}

export default BarrageCanvas;