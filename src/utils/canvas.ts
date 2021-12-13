/*
 * @Author: Allen OYang
 * @Date: 2021-08-18 10:21:56
 * @Descripttion:
 * @LastEditTime: 2021-12-01 11:42:10
 * @FilePath: /ts-vp/src/utils/canvas.ts
 */

interface canvas2D extends CanvasRenderingContext2D {
  webkitBackingStorePixelRatio?: any;
  mozBackingStorePixelRatio?: any;
  msBackingStorePixelRatio?: any;
  backingStorePixelRatio?: any;
  oBackingStorePixelRatio?: any;
}



class Canvas {
  public element: HTMLCanvasElement;
  public width: number;
  public height: number;
  public ratio: number;
  public ctx: canvas2D;

  public fontSize: number;

  constructor(element: HTMLCanvasElement, fontSize?: number) {
    this.fontSize = fontSize || 25;

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
    this.ctx.font = `${this.fontSize}px "PingFang SC", "Microsoft JhengHei", "Microsoft YaHei", "sans-serif"`;

  }

  resetScale() {
    console.log('resetScale');

    this.ctx.scale(this.ratio, this.ratio);
    this.ctx.font = `${this.fontSize}px "PingFang SC", "Microsoft JhengHei", "Microsoft YaHei", "sans-serif"`;
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

export default Canvas;