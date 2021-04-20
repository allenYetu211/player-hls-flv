/*
 * @Author: Allen OYang
 * @Date: 2021-03-30 10:59:36
 * @Descripttion: 
 * @LastEditTime: 2021-04-20 21:43:09
 * @FilePath: /ts-vp/src/player/flv-player.ts
 */
import VideoControl from './video-control';
import {videoConfig, IMultiStreams} from '@interfaces/index';

import flvjs from 'flv.js';

// @ts-ignore
// IE 11 测试环境需要使用本行代码
// import flvjs from 'flv.js/dist/flv';

export default class FlvPlayer extends VideoControl {

  // 自动播放
  private autoplay: boolean = false;

  // 默认播放
  private playerIndex: number = 0;

  // 播放列表
  private multiStreams: IMultiStreams[] = [{src: '', text: ''}];

  // 当前播放的列表
  private src: string  = '';


  private flv: any;

  constructor(config: videoConfig){
    super({
      element:  config.element,
      container:  config.containerEl,
      poster: config.poster
    })

    this.multiStreams = config.option!.multiStreams;
    this.playerIndex = config.option!.playIndex;

    // 当前播放的src 
    this.src = this.multiStreams[this.playerIndex].src;
    this.autoplay = config.autoplay || false;
    
    this.initVideoEl();
  }

  private initVideoEl() {
    this.flv = flvjs.createPlayer({type: 'flv',url: this.src,},{isLive: true});
    this.flv.attachMediaElement(this.videoEl);
    this.flv.load();
    this.autoplay && this.play();
    this.addPlayerListener();
  }

  public chooseMultiCode(key: number) {
    this.destroy();
    this.playerIndex = key;
    this.src = this.multiStreams[key].src;
    this.autoplay = true;
    this.initVideoEl()
  }

  private addPlayerListener() {

    this.flv.on(flvjs.ErrorTypes.NETWORK_ERROR, (e: any) => {
      this._emitter.emit('NETWORK_ERROR', e)
    })

    this.flv.on(flvjs.Events.STATISTICS_INFO, (e:any) => {
      this._emitter.emit('STATISTICS_INFO', e)
    })
    
    this.flv.on(flvjs.Events.ERROR, (e:any) => {
      this._emitter.emit('ERROR', e)
    })

    this.flv.on(flvjs.ErrorTypes.MEDIA_ERROR, (e:any) => {
      this._emitter.emit('MEDIA_ERROR', e)
    })

    this.flv.on(flvjs.ErrorTypes.OTHER_ERROR, (e:any) => {
      this._emitter.emit('OTHER_ERROR', e)
    })

    this.flv.on(flvjs.Events.LOADING_COMPLETE, (e:any) => {
      // LOADING_COMPLETE	The input MediaDataSource has been completely buffered to end
      this._emitter.emit('LOADING_COMPLETE')
    })

  }

  public  destroy(){
    this.flv.destroy();
  }

  public refresh() {
    this.stop()
    this.destroy();
    this.onRefershVideo()
    this.initVideoEl();
  }

}