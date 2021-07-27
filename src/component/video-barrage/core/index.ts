/*
 * @Author: Allen OYang
 * @Date: 2021-07-20 09:48:26
 * @Descripttion: 
 * @LastEditTime: 2021-07-27 15:36:46
 * @FilePath: /ts-vp/src/component/video-barrage/core/index.ts
 */


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
  top: number;
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

class BarrageCanvas {
  private element: HTMLCanvasElement;
  private width: number;
  private height: number;
  private ratio: number;
  private ctx: canvas2D;
  private barrageList: MsgItem[];
  private msgCacahLength: number = 100;
  // private barrageListItem: MsgItem[] = [];
  private requestAnimationFrameId: any;
  private isRunning: boolean = false;
  private isClose: boolean = false;


  constructor({ element, maxCache = 100 }: {
    element: HTMLCanvasElement, maxCache: number
  }) {
    this.barrageList = new Array(maxCache);
    this.msgCacahLength = maxCache;

    this.element = element;
    let rect = this.element.getBoundingClientRect();

    this.width = rect.right - rect.left;
    this.height = rect.bottom - rect.top;
    this.ctx = this.element.getContext('2d')!;


    // 针对电脑分辨率处理Ratio
    const devicePixelRatio = window.devicePixelRatio || 1
    const backingStoreRatio = this.ctx.webkitBackingStorePixelRatio ||
      this.ctx.mozBackingStorePixelRatio ||
      this.ctx.msBackingStorePixelRatio ||
      this.ctx.oBackingStorePixelRatio ||
      this.ctx.backingStorePixelRatio || 1
    this.ratio = devicePixelRatio / backingStoreRatio;

    const oldwidth = rect.width;
    const oldheight = rect.height;

    this.element.width = oldwidth * this.ratio;
    this.element.height = oldheight * this.ratio;

    this.element.style.width = oldwidth + 'px';
    this.element.style.height = oldheight + 'px';

    this.ctx.scale(this.ratio, this.ratio);
    this.ctx.font = `25px "PingFang SC", "Microsoft JhengHei", "Microsoft YaHei", "sans-serif"`;

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
    let counter = 0;

    this.barrageList.forEach((msg: MsgItem, index: number) => {
      if (!msg) {
        counter += 1;
        if (counter === this.msgCacahLength) {
          window.cancelAnimationFrame(this.requestAnimationFrameId);
          this.isRunning = false;
        }
      } else {
        this.isRunning = true;
        if (msg.left < 0 - this.width) {
          // @ts-ignore;
          this.barrageList[index] = null;
          return;
        } else {
          msg.left = msg.left - msg.speed;
          this.ctx.shadowColor = msg.color;
          this.ctx.fillStyle = msg.color;
          this.ctx.textAlign = "left";
          this.ctx.fillText(msg.value, msg.left, msg.top);
          const text = this.ctx.measureText(msg.value);
          msg.width = text.width * this.ratio;
          this.ctx.restore;
        }
      }
    });
  }

  start(){
    
    if(this.isClose) {
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


    for (let i = 0; i < this.msgCacahLength; i++) {
      if (!this.barrageList[i]) {
        this.barrageList[i] = {
          value: item.value,
          top: item.top || this.getLimitRandom(30, item.viewableArea ? item.viewableArea - 30 : this.height - 30),
          left: item.left || this.width,
          color: item.color || this.getColor(),
          speed: item.speed || 5
        }
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



  getColor() {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
  }

  getLimitRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  //获取偏移量
  getOffset() {
    return +(Math.random() * 4).toFixed(1) + 1;
  }


}

export default BarrageCanvas;