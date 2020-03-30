import React from 'react';
import {getVideoPlayer} from '@player/index';
import {iconRefresh} from '@images/icon';
import style from './style/index.scss';

const PlugInRefresh = () => {
  const player: any = getVideoPlayer();
  const onRefreshPlayer = () => {
    player.refresh();
  }
  return (
    <div 
    className={style.icon} 
    onClick={onRefreshPlayer}>
      {iconRefresh}
    </div>
  )
}

export default PlugInRefresh;