import EventEmitter from 'eventemitter3';
import {deviceType} from '@utils/phoneType';

interface ConfigType {
  element: HTMLVideoElement
}

export default class VideoContainer {

   // video
   public videoEl: HTMLVideoElement;


   // 事件中心
   public _emitter: EventEmitter = new EventEmitter();

  //  全屏状态
   public displayingFullscreenState:boolean = false;

  //  计时器
  private timer: any; 

  // 资源加载状态
  public resourceLoadingState: boolean = false;

  constructor(config: ConfigType) {
    this.videoEl  = config.element;
    // 添加video 监听
    this.addEventListener();
  }

  public stop() {
    this.videoEl.pause();
    clearInterval(this.timer);
    this._emitter.emit('stop');
  } 

  public play() {
    this._emitter.emit('clickPlay');
    this.videoEl.play().then(() => {
      this._emitter.emit('play');
      this.onPlayProgress()
    }).catch((error: any) => {
      this._emitter.emit('0001',  {error})
    })
  }

  public onPlayProgress() {
    this._emitter.emit('playProgress', this.videoEl.currentTime  * 1000);
    this.timer = setInterval(() => {
      this._emitter.emit('playProgress', this.videoEl.currentTime  * 1000)
      if (this.videoEl.currentTime >= this.videoEl.duration) {
        this.stop()
        return;
      }
    }, 1000)
  }

  // 设置声音
  public setVideoVolume (value: number) {
    this.videoEl.volume = value;
  }

  // 监听video事件
  private  addEventListener () {
  this.videoEl.addEventListener('timeupdate', (e: any) => {

      if(deviceType.ios) {
        if (this.displayingFullscreenState !== this.videoEl.webkitDisplayingFullscreen) {
          this.displayingFullscreenState = this.videoEl.webkitDisplayingFullscreen
          if(this.displayingFullscreenState) {
            this._emitter.emit('fullscreen', true)
          } else {
            this._emitter.emit('fullscreen', false)
            this.stop()
          }
        }
      }

      if (this.videoEl.readyState > 2 ) {
        this.resourceLoadingState = false;
        this._emitter.emit('mediaState', true)
      } else {
        this.resourceLoadingState = true;
        this._emitter.emit('mediaState', false)
      }
    })

     //  监听微信 Android 全屏
    this.videoEl.addEventListener('x5videoenterfullscreen', () => {
      console.log('x5videoenterfullscreen')
      this._emitter.emit('fullscreen', true)
    })
    this.videoEl.addEventListener('x5videoexitfullscreen', () => {
      console.log('x5videoexitfullscreen')
      this._emitter.emit('fullscreen', false)
    })

    this.videoEl.addEventListener("webkitbeginfullscreen", () => {
      console.log('webkitbeginfullscreen')
      this._emitter.emit('fullscreen', true)
    })
    
    this.videoEl.addEventListener("webkitendfullscreen", () => {
      console.log('webkitendfullscreen')
      this._emitter.emit('fullscreen', false)
    })
  }

  public setCurrentTime (value: number) {
    this.stop();
    this._emitter.emit('playProgress', value);
    this.videoEl.currentTime = value/1000;
  }

  public setPlaybackRate(value: number) {
    if (value === this.videoEl.playbackRate) {
      return 
    }
    this.videoEl.playbackRate = value;
  }



  // 发布订阅
  public on(event: string, listener: EventEmitter.ListenerFn) {
    this._emitter.addListener(event, listener);
  } 
  
  public once(event: string, listener: EventEmitter.ListenerFn) {
    this._emitter.once(event, listener);
  } 
  
  public off(event: string, listener: EventEmitter.ListenerFn) {
    this._emitter.removeListener(event, listener);
  }


}