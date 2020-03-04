import VideoControl from './video-control';
import {videoConfig, IMultiStreams} from '@interfaces/index';

import flvjs from 'flv.js';

export default class FlvPlayer extends VideoControl {

  // 自动播放
  private autoplay: boolean = false;

  // 默认播放
  private playerIndex: number = 0;

  // 播放列表
  private multiStreams: IMultiStreams[] = [{src: '', text: ''}];

  // 当前播放的列表
  private src: string  = '';

  private element: HTMLVideoElement;

  private flv: any;

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
    this.flv = flvjs.createPlayer({type: 'flv',url: this.src,},{isLive: true});
    this.flv.attachMediaElement(this.element);
    this.flv.load();
    this.autoplay && this.play();
    this.addPlayerListener();
  }

  public chooseMultiCode(key: number) {
    this.destroy();
    this.playerIndex = key
    this.src = this.multiStreams[key].src;
    this.initVideoEl()
  }

  private addPlayerListener() {
    this.flv.on(flvjs.ErrorTypes.NETWORK_ERROR, (e: any) => {
      this._emitter.emit('NETWORK_ERROR: FLV ===>', e)
    })

    this.flv.on(flvjs.Events.STATISTICS_INFO, (e:any) => {
      this._emitter.emit('STATISTICS_INFO: FLV ===>', e)
    })
    
    this.flv.on(flvjs.Events.ERROR, (e:any) => {
      this._emitter.emit('ERROR: FLV ===>', e)
    })

    this.flv.on(flvjs.ErrorTypes.MEDIA_ERROR, (e:any) => {
      this._emitter.emit('MEDIA_ERROR: FLV ===>', e)
    })

    this.flv.on(flvjs.ErrorTypes.OTHER_ERROR, (e:any) => {
      this._emitter.emit('OTHER_ERROR: FLV ===>', e)
    })
  }

  public  destroy(){
    this.flv.destroy();
  }
}