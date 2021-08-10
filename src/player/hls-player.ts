import VideoControl from './video-control';
import { videoConfig, IMultiStreams } from '@interfaces/index';

import { deviceType } from '@utils/phoneType';

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

  private timestampUnit: boolean | string = 't';

  constructor(config: videoConfig) {
    super({
      element: config.element,
      container: config.containerEl,
      poster: config.poster
    })

    console.log('config.timestampUnit', config.timestampUnit);

    if (typeof config.timestampUnit === 'string') {
      this.timestampUnit = config.timestampUnit;
    } else if (typeof config.timestampUnit === 'boolean') {
      this.timestampUnit = config.timestampUnit ? 't' : false
    };


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

      const hlsConfig = Object.assign({
        xhrSetup: async (xhr: any, url: string) => {
          //  .ts 文件不增加时间戳，防止文件OSS 命中降低。
          let requestUrl = url;
          /**
           *  TODO:  windos系统电脑问题 IE11 黑屏内存使用率过高情况下偶现黑屏（高概率）
           *  可能原因:   
           *   1. 电脑CPU 使用率过高， 关闭高使用率的应用后，黑屏情况大幅减少约（1/20）
           *   2. 偶现部分TS 文件请求被挂载，可能愿意还是CPU 问题导致IE请求发送被挂载。
           *  可以修改调试： (/\.m3u8/.test(url) ||  deviceType.ie) 
           *  
           */

          console.log('this.timestampUnit??>>>>>>>', this.timestampUnit)
          if (this.timestampUnit && (/\.m3u8/.test(url) || deviceType.ie)) {
            requestUrl = /\?/.test(url) ? `${url}&${this.timestampUnit}=${new Date().getTime()}` : `${url}?${this.timestampUnit}=${new Date().getTime()}`
          }
          xhr.open('GET', requestUrl, true);
        }
      }, deviceType.ie ? {} : {
        maxBufferLength: 120,
        maxMaxBufferLength: 600,
        maxBufferSize: 60 * 1000 * 1000,
      })


      this.hls = new Hls(hlsConfig);

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