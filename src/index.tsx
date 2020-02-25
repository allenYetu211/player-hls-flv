
import React, {useRef, useEffect, useState} from 'react';

import style from './styles.scss';

import {initConfig} from '@interfaces/vp';

import Player, {initPlayer} from '@player/index';


import UiControl from '@g/component/uiControl';


const VideoPlayer = (props: initConfig) => {


  const videoEl = useRef<HTMLVideoElement>(null);

  const [initState, setInitState] = useState<boolean>(false);

  const [vPlayer, setVPlayer] = useState<any>();


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
    if(videoEl.current) {
      const config = Object.assign({}, props, {
        element: videoEl.current,
      })
      const vp = initPlayer(config);
      setVPlayer(vp);
      setInitState(true);
      addEventListener(vp)
    }
  }, [])

  // 监听状态
  const addEventListener = (vp: any) => {
    vp.on('0001', (info: string) => {
      console.log('0001', info)
    })
  }


  return (
  <div className={style.container}>
    <video ref={videoEl} />
    {initState && <UiControl config={props} />}
  </div>);
}

export default VideoPlayer;
