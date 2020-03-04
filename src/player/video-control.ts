import EventEmitter from 'eventemitter3';

interface ConfigType {
  element: HTMLVideoElement
}

export default class VideoContainer {

   // video
   public videoEl: HTMLVideoElement;


   // 事件中心
   public _emitter: EventEmitter = new EventEmitter();

  //  计时器
  private timer: any; 

  constructor(config: ConfigType) {
    this.videoEl  = config.element;
    //  监听视频全图
    this.addEventListenerFullscreen();
    this.addEventListenerWaiting()
  }

  public stop() {
    this.videoEl.pause();
    clearInterval(this.timer);
    this._emitter.emit('stop');
  } 

  public play() {
    this.videoEl.play().then(() => {
      this._emitter.emit('play');
      this.onPlayProgress()
    }).catch((error: any) => {
      this._emitter.emit('0001', error)
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

  private addEventListenerWaiting() {
    this.videoEl.addEventListener('waiting', (e: any) => {
      console.log('waiting', e);
      // this._emitter.emit('fullscreen', true)
    })
  }

  // 监听全屏事件
  private  addEventListenerFullscreen () {
     //  监听微信 Android 全屏
     this.videoEl.addEventListener('x5videoenterfullscreen', () => {
      this._emitter.emit('fullscreen', true)
    })
    this.videoEl.addEventListener('x5videoexitfullscreen', () => {
      this._emitter.emit('fullscreen', false)
    })

    this.videoEl.addEventListener("webkitbeginfullscreen", () => {
      this._emitter.emit('fullscreen', true)
    })
    
    this.videoEl.addEventListener("webkitendfullscreen", () => {
      this._emitter.emit('fullscreen', false)
    })
  }

  public setCurrentTime (value: number) {
    this.stop();
    this._emitter.emit('playProgress', value);
    this.videoEl.currentTime = value/1000;
  }

  public on(event: string, listener: EventEmitter.ListenerFn) {
    this._emitter.addListener(event, listener);
  } 
  
  public off(event: string, listener: EventEmitter.ListenerFn) {
    console.log("event", event)
    this._emitter.removeListener(event, listener);
  }


}