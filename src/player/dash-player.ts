import dashjs from 'dashjs';
import VideoControl from './video-control';
import {videoConfig, IMultiStreams} from '@interfaces/index';

export default  class DashPlayer extends VideoControl {

  private src: string = '';

  private dash: any = null;

  constructor(config: videoConfig){
    super({
      element:  config.element,
      container:  config.containerEl,
      poster: config.poster
    })
    this.src =  config.src!;
    this.initVideoEl()
  }

  initVideoEl () {
    this.dash = dashjs.MediaPlayer().create();
    this.dash.initialize(this.videoEl, this.src);

    this.videoEl.addEventListener('loadedmetadata', () => {
      this._emitter.emit('duration', this.videoEl.duration * 1000)
    });
    
  }

  public  destroy(){
    this.dash.reset();
  }


}