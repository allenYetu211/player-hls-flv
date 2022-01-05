import EventEmitter from 'eventemitter3';
import { deviceType } from '@utils/phoneType';

interface ConfigType {
  element: HTMLVideoElement,
  container: HTMLDivElement,
  poster?: string;
}

export default class VideoContainer {

  // video
  public videoEl: HTMLVideoElement;

  // containerEl
  public containerEl: HTMLDivElement;


  // 事件中心
  public _emitter: EventEmitter = new EventEmitter();

  //  全屏状态
  public displayingFullscreenState: boolean = false;

  public config: ConfigType;

  //  计时器
  private timer: any;

  // 增加挂载方法， 暂放此处
  public mountFunction: any = {}

  // 资源加载状态
  // public resourceLoadingState: boolean = false;

  constructor(config: ConfigType) {
    this.config = config;
    this.videoEl = config.element;
    this.containerEl = config.container;
    // 设置参数
    this.addVideoAttribute()
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

    // 兼容IE，ie浏览器不存在then 方法
    try {
      this.videoEl.play()
      this._emitter.emit('play');
      this.onPlayProgress()
    } catch (error) {
      this._emitter.emit('0001', { error })
    }

    // this.videoEl.play().then(() => {
    //   this._emitter.emit('play');
    //   this.onPlayProgress()
    // }).catch((error: any) => {
    //   this._emitter.emit('0001',  {error})
    // })
  }

  public onPlayProgress() {
    this._emitter.emit('playProgress', this.videoEl.currentTime * 1000);
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this._emitter.emit('playProgress', this.videoEl.currentTime * 1000)
      if (this.videoEl.currentTime >= this.videoEl.duration) {
        clearInterval(this.timer);
        this.stop();
        return;
      }
    }, 1000)
  }


  // 计算操作缓冲内容长度
  public onCacheUpdate() {
    let buffered = this.videoEl.buffered
    if (buffered && buffered.length > 0) {
      let end = buffered.end(buffered.length - 1)
      for (let i = 0, len = buffered.length; i < len; i++) {
        if (this.videoEl.currentTime >= buffered.start(i) && this.videoEl.currentTime <= buffered.end(i)) {
          end = buffered.end(i)
          for (let j = i + 1; j < buffered.length; j++) {
            if (buffered.start(j) - buffered.end(j - 1) >= 2) {
              end = buffered.end(j - 1)
              break
            }
          }
          break
        }
      }
      const catchValue = `${(end / this.videoEl.duration * 100).toFixed(3)}%`;
      this._emitter.emit('catchUpdate', catchValue)
    }
  }

  // 监听video事件
  private addEventListener() {

    if (!this.videoEl) { return }

    this.videoEl.addEventListener('progress', () => {
      this.onCacheUpdate()
    })

    this.videoEl.addEventListener('timeupdate', (e: any) => {

      // TODO : 监听缓冲时间,  设置缓冲区。
      // {length: 4}
      // this._emitter.emit('bufferedState', {
      //   bufferedStart: this.videoEl.buffered.start(0),
      //   bufferedEnd: this.videoEl.buffered.end(0)
      // })

      /**
       * @TODO 为什么需要重复监听？
       */
      // if (this.videoEl.paused) {
      //   this._emitter.emit('stop');
      // } else {
      //   this._emitter.emit('play');
      // }


      // 手机检测
      if (!deviceType.pc) {
        // @ts-ignore
        const FullscreenState = this.videoEl.webkitDisplayingFullscreen;
        if (this.displayingFullscreenState !== FullscreenState) {
          this.displayingFullscreenState = FullscreenState
          if (this.displayingFullscreenState) {
            this._emitter.emit('fullscreen', true)
          } else {
            this._emitter.emit('fullscreen', false)
            this.stop()
          }
        }
      }

      if (this.videoEl.readyState > 2) {
        // this.resourceLoadingState = false;
        this._emitter.emit('mediaState', true)
      } else {
        // this.resourceLoadingState = true;
        this._emitter.emit('mediaState', false)
      }
    })



    // conso.
    this.videoEl.addEventListener('leavepictureinpicture', () => {
      // @ts-ignore
      console.log('leavepictureinpicture>>>', this.videoEl.paused)
    })

    this.videoEl.addEventListener('enterpictureinpicture', () => {
      console.log('enterpictureinpicture')
    })

    //  监听微信 Android 全屏
    this.videoEl.addEventListener('x5videoenterfullscreen', () => {
      console.log('x5videoenterfullscreen')
      this._emitter.emit('fullscreen', true)
    })
    this.videoEl.addEventListener('x5videoexitfullscreen', () => {
      console.log('x5videoexitfullscreen')
      this._emitter.emit('fullscreen', false)

      // console.log('增加 WeixinJSBridge')
      // // @ts-ignore
      // if(WeixinJSBridge) {
      //   // @ts-ignore
      //   WeixinJSBridge.call('closeWindow');
      // }
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

  public setCurrentTime(value: number) {
    this.stop();
    this._emitter.emit('playProgress', value);
    this.videoEl.currentTime = value / 1000;
  }

  public setVideoCurrentTime(value: number) {
    // TODO , 童虎修改内容
    this._emitter.emit('playProgress', value * 1000);
    this.videoEl.currentTime = value;
  }
  // 设置声音
  public setVideoVolume(value: number) {
    this.videoEl.volume = value;
  }


  public setPlaybackRate(value: number) {
    if (value === this.videoEl.playbackRate) {
      return
    }
    this.videoEl.playbackRate = value;
  }

  public addVideoAttribute = () => {
    if (!this.videoEl) { return }
    // 禁止下载按钮
    this.videoEl.setAttribute("controlslist", 'nodownload');
    this.videoEl.setAttribute("playsinline", 'true');
    // 禁止下载按钮
    this.videoEl.setAttribute("controlslist", 'nodownload nofullscreen noremoteplayback');
    this.videoEl.setAttribute("webkit-playsinline", 'true');
    // 适配微信webview
    this.videoEl.setAttribute("x5-video-player-type", 'h5');
    this.videoEl.setAttribute("preload", "auto");
    // this.videoEl.setAttribute("poster", this.config.poster || '');

    // if (deviceType.androidTx) {
    this.videoEl.setAttribute("x5-video-orientation", "landscape|portrait");
    this.videoEl.setAttribute("x5-playsinline", 'true');
    this.videoEl.setAttribute("x5-video-player-type", 'h5');
    // }
  }

  public onRefershVideo() {
    const oldVideoElVolume = this.videoEl.volume;
    this.videoEl.remove();
    const newVideoEl = document.createElement('video');
    this.videoEl = newVideoEl;
    this.addVideoAttribute()
    this.addEventListener()
    this.containerEl.appendChild(newVideoEl);
    this._emitter.emit('oldVolume', oldVideoElVolume)
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

  public removeAllListeners() {
    this._emitter.removeAllListeners();
  }


}