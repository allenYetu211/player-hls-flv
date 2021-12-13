/*
 * @Author: Allen OYang
 * @Date: 2021-07-19 15:08:01
 * @Descripttion: 
 * @LastEditTime: 2021-12-01 14:23:57
 * @FilePath: /ts-vp/src/component/video-barrage/index.tsx
 */

import React from 'react';
import BarrageCanvas from './core';
import { getVideoPlayer } from '@player/index';

import { videoBarrageType } from '@g/index';

const VideoBarrage: React.FC<{ videoBarrageConfig: videoBarrageType }> = (props) => {


  const canvasEl = React.useRef<HTMLCanvasElement>(null);
  const canvasContentEl = React.useRef<HTMLDivElement>(null);

  const player = React.useRef(getVideoPlayer());

  const windowSite = React.useRef({
    w: 0,
    h: 0
  })

  React.useEffect(() => {
    const barrage = new BarrageCanvas({
      element: canvasEl.current!,
      maxCache: 100,
      ...props.videoBarrageConfig,
    });

    player.current.mountFunction['barrage'] = {
      start: barrage.start.bind(barrage),
      push: barrage.pushBarrage.bind(barrage),
      clean: barrage.clean.bind(barrage),
      open: barrage.open.bind(barrage),
    }

    //  监听窗口大小变化
    window.addEventListener('resize', () => {

      const { offsetWidth: canvasWidth, offsetHeight: canvasHeight } = canvasEl.current!;
      const { offsetWidth: contentWidth } = canvasContentEl.current!
      const rate = contentWidth / canvasWidth;

      canvasEl.current!.style.width = `${contentWidth}px`;
      // canvasEl.current!.style.height = `${canvasHeight * rate}px`;

      canvasEl.current!.setAttribute('width', `${contentWidth}`);
      // canvasEl.current!.setAttribute('height', `${canvasHeight * rate}`);

      barrage.clean();
      setTimeout(() => {
        barrage.open()
      }, 1000)
    })
  }, [])

  return (
    <div
      ref={canvasContentEl}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: 9999,
        pointerEvents: 'none'
      }}>
      <canvas
        style={{
          width: '100%',
          height: '100%',
        }}
        ref={canvasEl} />
    </div>
  )
}

export default VideoBarrage;