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

  public setCurrentTime (value: number) {
    this.stop();
    this._emitter.emit('playProgress', value);
    this.videoEl.currentTime = value/1000;
  }

  public on(event: string, listener: EventEmitter.ListenerFn) {
    this._emitter.addListener(event, listener);
  }

}