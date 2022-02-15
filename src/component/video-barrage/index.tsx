/*
 * @Author: Allen OYang
 * @Date: 2021-07-19 15:08:01
 * @Descripttion: 
 * @LastEditTime: 2022-01-11 16:44:24
 * @FilePath: /ts-vp/src/component/video-barrage/index.tsx
 */

import React from 'react';
import BarrageCanvas from './core';
import { getVideoPlayer } from '@player/index';
import { videoBarrageType } from '@g/index';
import debounce from 'lodash.debounce';

const VideoBarrage: React.FC<{ videoBarrageConfig: videoBarrageType }> = (props) => {


  const canvasEl = React.useRef<HTMLCanvasElement>(null);
  const canvasContentEl = React.useRef<HTMLDivElement>(null);
  const player = React.useRef(getVideoPlayer());

  React.useEffect(() => {
    const barrage = new BarrageCanvas({
      element: canvasEl.current!,
      ...props.videoBarrageConfig,
    });

    const { autoEmpty = true } = props.videoBarrageConfig;

    if (autoEmpty) {
      //  监听窗口大小变化
      window!.addEventListener('resize', debounce(() => {
        console.log('窗口发生改变')
        resetView();
      }, 300))
    }

    const resetView = () => {
      const { offsetWidth: contentWidth } = canvasContentEl.current!
      canvasEl.current!.style.width = `${contentWidth}px`;
      canvasEl.current!.setAttribute('width', `${contentWidth}`);
      barrage.resetCanvas();
      barrage.restart();
    }

    player.current.mountFunction['barrage'] = {
      start: barrage.start.bind(barrage),
      push: barrage.pushBarrage.bind(barrage),
      clean: barrage.clean.bind(barrage),
      open: barrage.open.bind(barrage),
      resetView
    }


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