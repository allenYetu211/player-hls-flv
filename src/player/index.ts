import {videoConfig} from '@interfaces/index';
import NaitvePlayer from './native-player';
import FlvPlayer from './flv-player';
import HlsPlayer from './hls-player';
// import DashPlayer from './dash-player';

let videoPlayer:any;

export default class Player {
  constructor(config: videoConfig) {
    // 判断类型
    // 手机端 HLS 不在使用hlsjs ， 直接使用原生播放处理
    switch(config.type) {
      case 'hls':
      case 'm3u8': {
        console.log('config::', config)
        return new HlsPlayer(config);
      }
      case 'flv' : {
        return new FlvPlayer(config);
      }
      case 'mp4' :
      // case 'hls' :
      // case 'm3u8': 
      {
        return new NaitvePlayer(config);
      }

      // case 'dash' :  {
      //   return new DashPlayer(config);
      // }
      default: {
            throw new Error('unsupport media type');
        }
    }
  }
}

export const getVideoPlayer = () => {
  return videoPlayer;
}

export const initPlayer = (config: videoConfig) => {
    videoPlayer = new Player(config);
    return videoPlayer;
}

