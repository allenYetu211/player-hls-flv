import VideoControl from './video-control';
import { videoConfig, IMultiStreams } from '@interfaces/index';

import Hls from 'hls.js';

export default class HLSPlayer extends VideoControl {
  // 是否为VOD
  private vod: boolean = false;

  // 自动播放
  private autoplay: boolean = false;

  // 默认播放
  private playerIndex: number = 0;

  // 播放列表
  private multiStreams: IMultiStreams[] = [{ src: '', text: '' }];

  // 当前播放的列表
  private src: string = '';

  private hls: any;

  constructor(config: videoConfig) {
    super({
      element: config.element,
      container: config.containerEl,
      poster: config.poster
    })

    // 如果是vod点播，
    if (!config!.vod) {
      // 如果存在option，则处理多码率。
      if (config.option) {
        this.multiStreams = config.option!.multiStreams;
        this.playerIndex = config.option!.playIndex;
        // 当前播放的src 
        this.src = this.multiStreams[this.playerIndex].src;
      } else {
        this.src = config.src || ''
      }
    } else {
      this.vod = true;
      this.src = config.src || '';
    }
    this.autoplay = config.autoplay || false;
    this.initVideoEl();
  }

  private initVideoEl() {
    if (Hls.isSupported()) {
      this.hls = new Hls({
        xhrSetup: async (xhr, url) => {
          //  .ts 文件不增加时间戳，防止文件OSS 命中降低。
          let requestUrl = url;
          if (/\.m3u8/.test(url)) {
            requestUrl = /\?/.test(url) ? `${url}&t=${new Date().getTime()}` : `${url}?t=${new Date().getTime()}`
          } 
        
          xhr.open('GET', requestUrl, true);
        },
        // maxBufferLength: 300
        maxBufferLength: 120
        // maxBufferLength: 30,
        // maxMaxBufferLength: 600,
        // maxBufferSize: 60*1000*1000,
      });
      this.hls.loadSource(this.src);
      this.hls.attachMedia(this.videoEl);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.autoplay && this.play();
        if (this.vod) {
          this.videoEl.addEventListener('loadedmetadata', () => {
            this._emitter.emit('duration', this.videoEl.duration * 1000)
          });
        }
      });

      this.addPlayerListener();

    } else if (this.videoEl.canPlayType('application/vnd.apple.mpegurl')) {
      this.videoEl.src = this.src;
      this.videoEl.load();
      this.videoEl.addEventListener('loadedmetadata', () => {
        this.autoplay && this.play();
        this._emitter.emit('duration', this.videoEl.duration * 1000)
        // 获取时长
      });
    } else {
      throw new Error('Hls player error');
    }
  }

  public chooseMultiCode(key: number) {
    try {
      this.destroy();
    } catch (e) {
      console.log('hls not function');
    }

    this.playerIndex = key;
    this.src = this.multiStreams[key].src;
    this.autoplay = true;
    this.initVideoEl()
  }

  private addPlayerListener() {
    this.hls.on(Hls.ErrorTypes.NETWORK_ERROR, (e: any) => {
      this._emitter.emit('NETWORK_ERROR: HLS ===>', e)
    })

    this.hls.on(Hls.Events.ERROR, (e: any) => {
      this._emitter.emit('ERROR: HLS ===>', e)
    })

    this.hls.on(Hls.ErrorTypes.MEDIA_ERROR, (e: any) => {
      this._emitter.emit('MEDIA_ERROR: HLS ===>', e)
    })

    this.hls.on(Hls.ErrorTypes.OTHER_ERROR, (e: any) => {
      this._emitter.emit('OTHER_ERROR: HLS ===>', e)
    })
  }

  public updatePath(src: string) {
    this.autoplay = !this.videoEl.paused;
    this.destroy();
    this.src = src;
    this._emitter.emit('playProgress', 0);
    this.refresh();
  }

  public destroy() {
    if (this.hls) {
      this.hls.destroy();
    }
  }

  public refresh() {
    console.log('Refresh HLS')
    this.stop()
    this.destroy();
    this.onRefershVideo()
    this.initVideoEl();
  }

}