/*
 * @Author: Allen OYang
 * @Date: 2021-05-06 15:19:54
 * @Descripttion: 
 * @LastEditTime: 2021-05-10 15:13:55
 * @FilePath: /ts-vp/src/component/plugIn-playBtn/index.tsx
 */
import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import style from './style/index.scss';

import { iconVideoPlay, iconVideoStop } from '@images/icon';

import HotVideo, {HocVideoType} from '@g/hoc-component/hoc-video';


const PlugInPlayBtn = (props: HocVideoType) => {
  const [playerState, setPlayerState] = useState<boolean>(false);


  // useEffect(() => {
  //   onListenerState('on');
  //   return () => {
  //     onListenerState('off')
  //   }
  // }, []);

  const onListenerState = (state: 'on' | 'off') => {
    props.player[state]('play', () => {
      console.log('play');
      setPlayerState(true);
    });
  
    props.player[state]('stop', () => {
      console.log('stop');
      setPlayerState(false);
    });
  };

 
  const onSwitchPlayer = () => {
    if (playerState) {
      props.player.stop()
    } else {
      props.player.play()
    }
  }

  // 播放状态
  return (
    <div className={cn(style.icon)} onClick={onSwitchPlayer}>
      {playerState ? iconVideoStop : iconVideoPlay}
    </div>
  );
};

export default HotVideo(PlugInPlayBtn);
