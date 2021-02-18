
import {videoConfig, Element, IMultiStreams} from '@interfaces/index';
import VideoControl from './video-control';
import {httpFetch} from '../utils/fetch';
export default class NativePlayer extends VideoControl {

  // 播流地址
  private src: string = '';

   // 自动播放
  public autoplay: boolean = false;

  public type: string = '';

  // 时长
  private duration: number = 0;

  // 播放列表
  private multiStreams: IMultiStreams[] = [{src: '', text: ''}];

   // 默认播放
  private playerIndex: number = 0;

  constructor(config: videoConfig) {
    super({
      element:  config.element,
      container:  config.containerEl,
      poster: config.poster
    })
    this.autoplay = config.autoplay || false;

    this.type = config.type!;

    this.duration = config.duration!;

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
    this.videoEl.src = this.src;
    this.videoEl.load();


    // this.videoEl.addEventListener('error',  (error) => {
    //   httpFetch({url: this.videoEl.src, method: 'head'}).then((resolve) => {
    //     this._emitter.emit('pathState', {
    //       url: this.src,
    //       status: resolve.status
    //     })
    //   })
    // })



    this.videoEl.addEventListener('loadedmetadata', () => {
      this.autoplay && this.play();
      if (this.videoEl.duration) {
        this._emitter.emit('duration', this.videoEl.duration * 1000)
      } else if(this.duration) {
        this._emitter.emit('duration', this.duration)
      }
    })
  }

  public  updateMp4Path (src: string, duration: number) {
    this._emitter.emit('playProgress', 0);
    this.src = src;
    this.videoEl.src = src;
    this.duration = duration;
    this.initVideoEl()
  }

  public chooseMultiCode(key: number) {
    this.destroy();
    this.playerIndex = key;
    this.src = this.multiStreams[key].src;
    this.autoplay = true;
    this.initVideoEl()
  }

  public  destroy(){
    this.stop()

    //  HACK 
    //  当视频mp4 为 pending状态时，切换mp4链接，进行了暂停操作后， 此视频在浏览器中仍会继续架加载。  会出现串音操作。
    //  直接将链接至为空，并重新loading。
    this.videoEl.src = '';
    this.videoEl.load()
    console.log('Native destroy')
  }

  public refresh() {
    console.log('Refresh mp4')
    this.onRefershVideo();
    this.destroy();
    this.initVideoEl();
    this._emitter.emit('refresh')
  }
 
}
