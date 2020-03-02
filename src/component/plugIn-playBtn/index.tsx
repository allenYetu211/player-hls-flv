import React, {useEffect, useState} from 'react';
import {getVideoPlayer} from '@player/index';
import cn from 'classnames';
import style from './style/index.scss';


import {iconVideoPlay, iconVideoStop} from '@images/icon';



const PlugInPlayBtn = () => {
  // 播放状态
  const [isPlayering, setIsPlayering] = useState<boolean>(false);
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
  };

  const switcherPlayState = () => {
    isPlayering ?  player.stop() : player.play() 
  }

  return (
    <div className={cn(style.icon)} onClick={switcherPlayState}>
      {isPlayering ?  iconVideoStop : iconVideoPlay}
    </div>
  );
};

export default PlugInPlayBtn;
