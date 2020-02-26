import React, {useEffect, useState} from 'react';
import {getVideoPlayer} from '@player/index';
import cn from 'classnames';
import style from './style/index.scss';

import {msToTime} from '@utils/translateTime';

import {iconVideoPlay, iconVideoStop} from '@images/icon';



const PlugInPlayBtn = () => {
  // 播放状态
  const [isPlayering, setIsPlayering] = useState<boolean>(false);
  const [playProgress, setPlayProgress] = useState<string>('00:00');
  const [videoDuration, setVideoDuration] = useState<string>('00:00');
  
  // 播放器
  const player: any = getVideoPlayer();
  useEffect(() => {
    addEventListener();
  }, []);

  const addEventListener = () => {
    player.on('play', () => {
      setIsPlayering(true);
      console.log('Naitve play');
    });

    player.on('stop', () => {
      setIsPlayering(false);
      console.log('Naitve stop');
    });
    
    player.on('duration', (duration: string) => {
      setVideoDuration(msToTime(duration));
      console.log('video duration');
    }); 
    
    player.on('playProgress', (duration: string) => {
      setPlayProgress(msToTime(duration));
      console.log('video playProgress');
    });
  };

  const switcherPlayState = () => {
    isPlayering ?  player.stop() : player.play() 
  }

  return (
    <div className={style.container}>
      <div className={cn(style.icon)} onClick={switcherPlayState}>
        {isPlayering ?  iconVideoStop : iconVideoPlay}
      </div>

      <div className={style.progressBar}>
        {playProgress} / {videoDuration}
      </div>

    </div>
  );
};

export default PlugInPlayBtn;
