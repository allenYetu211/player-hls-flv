/*
 * @Author: Allen OYang
 * @Date: 2021-05-10 11:04:00
 * @Descripttion: 
 * @LastEditTime: 2021-05-10 14:09:15
 * @FilePath: /ts-vp/src/hoc-component/hoc-video.tsx
 */


import React from 'react';

import { getVideoPlayer } from '@player/index';

const HotVideo = (BaseComponent: any) => {

  return (props: any) => {
    const player: any = getVideoPlayer();

    return (
      <BaseComponent {...props} player={player} />
    )
  }
}

export default HotVideo;

export type HocVideoType =  {
  player: any;
};