/*
 * @Author: Allen OYang
 * @Date: 2021-01-21 11:19:27
 * @Descripttion: 
 * @LastEditTime: 2021-05-08 16:01:00
 * @FilePath: /ts-vp/src/component/plugIn-refresh/index.tsx
 */
import React from 'react';
import {iconRefresh} from '@images/icon';
import style from './style/index.scss';

// import { getVideoPlayer } from '@player/index';

import HotVideo, {HocVideoType} from '@g/hoc-component/hoc-video';


const PlugInRefresh = (props: HocVideoType) => {

  // const player = getVideoPlayer();

  const onRefreshPlayer = () => { props.player.refresh() }


  return (
    <div 
    className={style.icon} 
    onClick={onRefreshPlayer}>
      {iconRefresh}
    </div>
  )
}


export default HotVideo(PlugInRefresh);