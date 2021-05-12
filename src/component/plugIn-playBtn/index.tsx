/*
 * @Author: Allen OYang
 * @Date: 2021-05-06 15:19:54
 * @Descripttion: 
 * @LastEditTime: 2021-05-10 16:05:26
 * @FilePath: /ts-vp/src/component/plugIn-playBtn/index.tsx
 */
import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import style from './style/index.scss';

import { iconVideoPlay, iconVideoStop } from '@images/icon';

import HotVideo, { HocVideoType } from '@g/hoc-component/hoc-video';

interface Props extends HocVideoType {
  isShowPlayering?: boolean;
}

const PlugInPlayBtn = (props: Props) => {
  const [playerState, setPlayerState] = useState<boolean>(false);


  useEffect(() => {
    onListenerState('on');
    return () => {
      onListenerState('off')
    }
  }, []);

  const onListenerState = (state: 'on' | 'off') => {
    props.player[state]('play', () => {
      setPlayerState(true);
    });

    props.player[state]('stop', () => {
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
    <div className={cn(style.icon,  {
      [style.hide]: props.isShowPlayering
    })} onClick={onSwitchPlayer}>
      {playerState ? iconVideoStop : iconVideoPlay}
    </div>
  );
};

export default HotVideo(PlugInPlayBtn);
