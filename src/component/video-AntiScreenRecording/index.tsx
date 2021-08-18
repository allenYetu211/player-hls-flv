/*
 * @Author: Allen OYang
 * @Date: 2021-08-17 16:20:29
 * @Descripttion:
 * @LastEditTime: 2021-08-18 11:35:17
 * @FilePath: /ts-vp/src/component/video-AntiScreenRecording/index.tsx
 */


import React from 'react';

import AntiScreenRecoording from './core/index';

import { Type } from '@g/index';


export interface Props {
  antiScreenRecording: Type
}

const VideoAntiScreenRecording: React.FC<Props> = (props) => {
  const canvasEl = React.useRef<HTMLCanvasElement>(null);
  const antiRef = React.useRef<AntiScreenRecoording>();

  React.useEffect(() => {
    antiRef.current = new AntiScreenRecoording(canvasEl.current!, { ...props.antiScreenRecording });
    antiRef.current.start();
    return () => {
      antiRef.current!.clear()
    }
  }, []);

  return (
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
        pointerEvents: 'none'
      }}
      ref={canvasEl} />
  )

}

export default VideoAntiScreenRecording;
