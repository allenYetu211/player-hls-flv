import VideoControl from './video-control';
import {videoConfig, IMultiStreams} from '@interfaces/index';

import Hls from 'hls.js';

export default class HLSPlayer extends VideoControl {

  // 自动播放
  private autoplay: boolean = false;

  // 默认播放
  private playerIndex: number = 0;

  // 播放列表
  private multiStreams: IMultiStreams[] = [{src: '', text: ''}];

  // 当前播放的列表
  private src: string  = '';

  private element: HTMLVideoElement;

  private hls: any;

  constructor(config: videoConfig){
    super({
      element:  config.element,
    })

    this.multiStreams = config.option!.multiStreams;
    this.playerIndex = config.option!.playIndex;

    // 当前播放的src 
    this.src = this.multiStreams[this.playerIndex].src;
    this.autoplay = config.autoplay || false;
    
    this.element = config.element
    this.initVideoEl();
  }

  private initVideoEl() {
    console.log('Hls.isSupported()', Hls.isSupported())
    console.log('Hls.isSupported()', this.element.canPlayType('application/vnd.apple.mpegurl'))

    if (Hls.isSupported()) { 

      this.hls = new Hls();
      this.hls.loadSource(this.src);
      this.hls.attachMedia(this.element);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
      this.autoplay && this.play();
    });

    this.addPlayerListener();

    } else if (this.element.canPlayType('application/vnd.apple.mpegurl')) {
      this.videoEl.src = this.src;
      this.videoEl.load();
      this.element.addEventListener('loadedmetadata', () => {
        this.autoplay && this.play();
        this._emitter.emit('duration', this.videoEl.duration * 1000)
      });
    } else {
      throw new Error('Hls player error');
    }
  }

  public chooseMultiCode(key: number) {
    this.destroy();
    this.playerIndex = key;
    this.src = this.multiStreams[key].src;
    this.autoplay = true;
    this.initVideoEl()
  }

  private addPlayerListener() {
    this.hls.on(Hls.ErrorTypes.NETWORK_ERROR, (e: any) => {
      this._emitter.emit('NETWORK_ERROR: HLS ===>', e)
    })

    this.hls.on(Hls.Events.ERROR, (e:any) => {
      this._emitter.emit('ERROR: HLS ===>', e)
    })

    this.hls.on(Hls.ErrorTypes.MEDIA_ERROR, (e:any) => {
      this._emitter.emit('MEDIA_ERROR: HLS ===>', e)
    })

    this.hls.on(Hls.ErrorTypes.OTHER_ERROR, (e:any) => {
      this._emitter.emit('OTHER_ERROR: HLS ===>', e)
    })
  }

  public  destroy(){
    this.hls.destroy();
  }
}