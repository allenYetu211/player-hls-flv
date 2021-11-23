/*
 * @Author: Allen OYang
 * @Date: 2021-07-20 09:48:26
 * @Descripttion: 
 * @LastEditTime: 2021-11-24 03:31:25
 * @FilePath: /ts-vp/src/component/video-barrage/core/index.ts
 */


import CanvasProxy from '@utils/canvas';

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

interface canvas2D extends CanvasRenderingContext2D {
  webkitBackingStorePixelRatio?: any;
  mozBackingStorePixelRatio?: any;
  msBackingStorePixelRatio?: any;
  backingStorePixelRatio?: any;
  oBackingStorePixelRatio?: any;
}

class BarrageCanvas extends CanvasProxy {

  private barrageList: MsgItem[];
  private msgCacahLength: number = 100;
  // private barrageListItem: MsgItem[] = [];
  private requestAnimationFrameId: any;
  private isRunning: boolean = false;
  private isClose: boolean = false;

  private tracks: MsgItem[][] = [];
  private tracksCounts: number = 0;


  constructor({ element, maxCache = 100, fontSize = 25 }: {
    element: HTMLCanvasElement, maxCache: number, fontSize?: number
  }) {
    super(element, fontSize);
    this.barrageList = new Array(maxCache);
    this.msgCacahLength = maxCache;

    // 生成轨道数量
    // const tracks = Math.floor(this.height / (fontSize + 5))
    const tracks = Math.floor(300 / (fontSize + 5))
    // this.tracks = Array(tracks).fill([]);
    // this.tracksCounts = Array(tracks).fill(0);

    this.tracks = Array.from({ length: tracks }, () => []);
  }


  // addBrrage(value: string) {
  //   this.barrageListItem.push(value);
  // }

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
          this.ctx.fillText(msg.value, msg.left, index * 25 + 50);
          const text = this.ctx.measureText(msg.value);
          msg.width = text.width * this.ratio;
          this.ctx.restore();
        }

        // 检测当前弹幕是否已经滑动出去 , 如果是的，则进行删除。
        if (msg.left + (msg.width || 0) <= 0) {
          delete track[msgIndex];
          this.tracksCounts -= 1;
          if (this.tracksCounts === 0) {
            console.log('this.requestAnimationFrameId', this.requestAnimationFrameId);
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

    if (this.isClose) {
      return
    }
    const addTrackMsg = (currentTrack: MsgItem[]) => {
      this.tracksCounts += 1;
      currentTrack.push({
        value: item.value,
        left: (item.left || this.width) + 10,
        color: item.color || '#fff',
        speed: item.speed || 5,
        width: this.ctx.measureText(item.value).width
      })
    }
    /**
   * 检查当前列表最后一个内容是否都已经展现。
   * 如果为咱先则在下一个轨道内添加
   */
    for (let i = 0; i < this.tracks.length; i++) {
      const currentTrack = this.tracks[i];
      if (currentTrack.length !== 0) {
        const { width, left } = currentTrack[currentTrack.length - 1];
        //  判断轨道最后一条内容是否已经全部展现
        if (this.width >= width! + left) {
          addTrackMsg(currentTrack)
          break;
        }
      } else {
        addTrackMsg(currentTrack)
        break;
      }
    }

    if (this.isRunning) {
      return
    }
    this.start();
  }


  clean() {
    console.log('this.isRunning:', this.isRunning);
    this.isClose = true;

    if (this.isRunning) {
      window.cancelAnimationFrame(this.requestAnimationFrameId);
      this.isRunning = false;
    }
    this.ctx.clearRect(0, 0, this.width, this.height)
    // @ts-ignore;
    this.barrageList = this.barrageList.map(() => null);
  }

  open() {
    this.isClose = false;
    this.start();
  }






}

export default BarrageCanvas;