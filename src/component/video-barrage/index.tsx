/*
 * @Author: Allen OYang
 * @Date: 2021-07-19 15:08:01
 * @Descripttion: 
 * @LastEditTime: 2021-11-24 10:53:17
 * @FilePath: /ts-vp/src/component/video-barrage/index.tsx
 */

import React from 'react';
import BarrageCanvas from './core';
import { getVideoPlayer } from '@player/index';


const VideoBarrage: React.FC<{ fontSize?: number, defaultBarrageState?: boolean }> = (props) => {


  const canvasEl = React.useRef<HTMLCanvasElement>(null);

  const player = React.useRef(getVideoPlayer());

  const { fontSize } = props;

  React.useEffect(() => {
    const barrage = new BarrageCanvas({
      element: canvasEl.current!,
      maxCache: 100,
      fontSize: fontSize,
      defaultBarrageState: props.defaultBarrageState
    });

    player.current.mountFunction['barrage'] = {
      start: barrage.start.bind(barrage),
      push: barrage.pushBarrage.bind(barrage),
      clean: barrage.clean.bind(barrage),
      open: barrage.open.bind(barrage),
    }
  }, [])

  return (
    <>
      <canvas
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          // backgroundColor: '#fff'
        }}
        ref={canvasEl} />
    </>
  )
}

export default VideoBarrage;