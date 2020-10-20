
import React, { useRef, useEffect, useState, useContext } from 'react';
import style from './styles.scss';
import { initPlayer, getVideoPlayer } from '@player/index';
import UiControl from '@g/component/uiControl';
import { deviceType } from '@utils/phoneType';

import { GlobalContext } from '@g/store';


import {initConfig} from '@g/types/index';


const VideoPlayer = () => {

  const { store } = useContext(GlobalContext);

  // const [state, dispatch] = useContext(store);

  const videoEl = useRef<HTMLVideoElement>(null);

  const containerEl = useRef<HTMLDivElement>(null);

  const [initState, setInitState] = useState<boolean>(false);

  const [videoPlayer, setVideoPlayer] = useState<any>();

  // src 发生变化时候更新
  useEffect(() => {
    if (videoPlayer && videoPlayer.updateMp4Path) {
      videoPlayer.stop();
      videoPlayer.updateMp4Path(store.src, store.duration)
    }
  }, [store.src, store.duration])

  useEffect(() => {
    let vp: any = null;
    if (videoPlayer) {
      setInitState(false);
      onListenerState(videoPlayer, 'off');
      videoPlayer.destroy();
    }

    // 此处添加setTimeout 是处理切换码流类型时，销毁原本的播放器，需要一定时间重新初始。  
    // TODO 后续需要优化
    setTimeout(() => {
      const config = Object.assign({}, store, {
        element: videoEl.current!,
        containerEl: containerEl.current!,
      })

      vp = initPlayer(config);
      setInitState(true);
      onListenerState(vp, 'on');
      setVideoPlayer(vp);
      if (store.onVideoPlayerState) {
        store.onVideoPlayerState(vp);
      }
    }, 100)

    return () => {
      if (vp) {
        vp.destroy();
        // 清除所有监听
        vp.removeAllListeners();
        setInitState(false);
        console.log('====== destroy ======')
      }
    }
  }, [store.type])

  // 监听状态
  const onListenerState = (vp: any, state: 'on' | 'off') => {
    vp[state]('0001', (info: string) => {
      console.log('0001', info)
    })
  }


  return (
    <div ref={containerEl} className={style.container}>
      {initState && <UiControl element={containerEl.current!} />}
      <video ref={videoEl} />
    </div>);
}

export default VideoPlayer;