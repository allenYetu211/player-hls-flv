/*
 * @Author: Allen OYang
 * @Date: 2021-05-06 15:19:54
 * @Descripttion: 
 * @LastEditTime: 2021-05-08 17:14:14
 * @FilePath: /ts-vp/src/component/plugIn-playBtn/index.tsx
 */
import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import style from './style/index.scss';

import { getVideoPlayer } from '@player/index';

import { iconVideoPlay, iconVideoStop } from '@images/icon';


const PlugInPlayBtn = () => {
  const [playerState, setPlayerState] = useState<boolean>(false);
  const player: any = getVideoPlayer();


  useEffect(() => {
    onListenerState('on');
    return () => {
      onListenerState('off')
    }
  }, []);

  const onListenerState = (state: 'on' | 'off') => {

    player[state]('play', () => {
      setPlayerState(true);
    });
  
    player[state]('stop', () => {
      setPlayerState(false);
    });
  };

 
  const onSwitchPlayer = () => {
    if (playerState) {
      player.stop()
    } else {
      player.play()
    }
  }

  // 播放状态
  return (
    <div className={cn(style.icon)} onClick={onSwitchPlayer}>
      {playerState ? iconVideoStop : iconVideoPlay}
    </div>
  );
};

export default PlugInPlayBtn;
