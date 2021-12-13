/*
 * @Author: Allen OYang
 * @Date: 2021-12-01 15:15:39
 * @Descripttion:
 * @LastEditTime: 2021-12-06 15:01:48
 * @FilePath: /ts-vp/src/component/video-barrage-dom/index.tsx
 */


import React from 'react';

import { videoBarrageType } from '@g/index';

import { getVideoPlayer } from '@player/index';


import Barrage from './core';

const VideoBarrageDom: React.FC<{ videoBarrageConfig: videoBarrageType }> = (props) => {

  const divEl = React.useRef<HTMLDivElement>(null);
  const player = React.useRef(getVideoPlayer());


  React.useEffect(() => {
    const barrage = new Barrage({
      el: divEl.current!,
      ...props.videoBarrageConfig
    })

    player.current.mountFunction['barrage'] = {
      start: barrage.start.bind(barrage),
      push: barrage.push.bind(barrage),
      clean: barrage.clean.bind(barrage),
      open: barrage.open.bind(barrage),
    }
  }, []);


  return (
    <div
      ref={divEl}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: 9999,
        // pointerEvents: 'none'
      }} />
  )
}

export default VideoBarrageDom;