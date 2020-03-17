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
        onListenerState('on');
      }
      return () => {
        if (!props.notlistener)  {
          onListenerState('off');
        }
      }
  }, []);

  const onListenerState = (state: 'on' | 'off') => {
    console.log('onListenerState', state)
    player[state]('play', () => {
      setIsPlayering(true);
    });

    player[state]('stop', () => {
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
