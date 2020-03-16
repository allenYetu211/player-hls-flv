
import {videoConfig, Element, IMultiStreams} from '@interfaces/index';
import VideoControl from './video-control';
export default class NativePlayer extends VideoControl {

  // 播流地址
  private src: string = '';

   // 自动播放
  public autoplay: boolean = false;

  public type: string = '';

  // 播放列表
  private multiStreams: IMultiStreams[] = [{src: '', text: ''}];

   // 默认播放
  private playerIndex: number = 0;

  constructor(config: videoConfig) {
    super({
      element:  config.element,
    })
    this.autoplay = config.autoplay || false;

    this.type = config.type!;

    if (this.type === 'hls' || this.type === 'm3u8') {
      this.multiStreams = config.option!.multiStreams;
      this.playerIndex = config.option!.playIndex;

      // 当前播放的src 
      this.src = this.multiStreams[this.playerIndex].src;
   }

    if (this.type ==='mp4' || config.src) {
      this.src = config.src!
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

  public chooseMultiCode(key: number) {
    this.destroy();
    this.playerIndex = key;
    this.src = this.multiStreams[key].src;
    this.autoplay = true;
    this.initVideoEl()
  }

  public  destroy(){
    console.log('Native destroy')
  }
 
}
