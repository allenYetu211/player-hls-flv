import {videoConfig} from '@interfaces/player';
import NaitvePlayer from './native-player';

let videoPlayer:Player;

export default class Player extends NaitvePlayer{
  constructor(config: videoConfig) {
    super(config)
    // 判断类型
    switch(config.type) {
      case 'mp4': {
        return new NaitvePlayer(config);
      }
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