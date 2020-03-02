
import {videoConfig, Element} from '@interfaces/index';
import VideoControl from './video-control';

export default class NativePlayer extends VideoControl {

  // 播流地址
  private src: string = '';

   // 自动播放
   public autoplay: boolean = false;

  constructor(config: videoConfig) {
    super({
      element:  config.element,
    })
    this.autoplay = config.autoplay || false
    if (config.src) {
      this.src = config.src
    }
    this.initVideoEl()
  }

  // 初始播放器
  private initVideoEl() {
    this.videoEl.src = this.src ;
    this.videoEl.load();
    this.videoEl.addEventListener('loadedmetadata', () => {
      this.autoplay && this.play();
      // 获取时长，注入
      this._emitter.emit('duration', this.videoEl.duration * 1000)
    })
  }

  public  destroy(){
    console.log('Native destroy')
  }
 
}
