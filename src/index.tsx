
import React, {useRef, useEffect, useState} from 'react';

import style from './styles.scss';

import {initConfig} from '@interfaces/index';

import {initPlayer} from '@player/index';


import UiControl from '@g/component/uiControl';


const VideoPlayer = (props: initConfig) => {


  const videoEl = useRef<HTMLVideoElement>(null);

  const containerEl = useRef<HTMLDivElement>(null);

  const [initState, setInitState] = useState<boolean>(false);

  // 针对不同浏览器添加不同属性
  useEffect(() => {
    if(videoEl.current) {
      videoEl.current.setAttribute("playsinline", 'true');
      videoEl.current.setAttribute("webkit-playsinline", 'true');
      videoEl.current.setAttribute("x5-playsinline", 'true');
      videoEl.current.setAttribute("x5-video-player-type", 'h5');
      videoEl.current.setAttribute("x5-video-player-fullscreen", 'false');
    }
  })

  //  初始播放器
  useEffect(() => {
      const config = Object.assign({}, props, {
        element: videoEl.current!,
      })
      const vp:any = initPlayer(config);
      setInitState(true);
      addEventListener(vp);
      return () => {
        vp.destroy();
        console.log('====== destroy ====')
      }
  }, [])

  // 监听状态
  const addEventListener = (vp: any) => {
    vp.on('0001', (info: string) => {
      console.log('0001', info)
    })
  }


  return (
  <div ref={containerEl}  className={style.container}>
    <video ref={videoEl} />
    {initState && <UiControl config={props} element={containerEl.current!} />}
  </div>);
}

export default VideoPlayer;
