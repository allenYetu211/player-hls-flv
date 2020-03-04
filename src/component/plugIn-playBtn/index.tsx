import React, {useEffect, useState} from 'react';
import {getVideoPlayer} from '@player/index';
import cn from 'classnames';
import style from './style/index.scss';


import {iconVideoPlay, iconVideoStop} from '@images/icon';

interface IProps {
  notlistener?: boolean;
}

const PlugInPlayBtn = (props: IProps) => {
  // 播放状态
  const [isPlayering, setIsPlayering] = useState<boolean>(false);
  // 播放器
  const player: any = getVideoPlayer();
  useEffect(() => {
      if (!props.notlistener)  {
        addListenerState();
    }
  }, []);

  const addListenerState = () => {
    player.on('play', () => {
      setIsPlayering(true);
    });

    player.on('stop', () => {
      setIsPlayering(false);
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
