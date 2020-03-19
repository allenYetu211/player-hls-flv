
import React, {useRef, useEffect, useState} from 'react';
import style from './styles.scss';
import {initPlayer, getVideoPlayer} from '@player/index';
import UiControl from '@g/component/uiControl';
import {deviceType} from '@utils/phoneType';
export interface initConfig {
  type?: 'flv' | 'hls' | 'mp4' | 'm3u8',
  src?: string;
  autoplay?: boolean;
  option?: IMultiStreamsContainer;
  isMobile?: boolean;
}

export interface IMultiStreams {
  src: string;
  text: string
}

export interface IMultiStreamsContainer {
multiStreams: IMultiStreams[];
playIndex: number;
}



const VideoPlayer = (props: initConfig) => {

  const videoEl = useRef<HTMLVideoElement>(null);

  const containerEl = useRef<HTMLDivElement>(null);

  const [initState, setInitState] = useState<boolean>(false);

  const [videoPlayer, setVideoPlayer] = useState<any>();

  // 针对不同浏览器添加不同属性
  useEffect(() => {
    if(videoEl.current) {
      videoEl.current.setAttribute("playsinline", 'true');
      videoEl.current.setAttribute("webkit-playsinline", 'true');

      if (deviceType.androidTx) {
        videoEl.current.setAttribute("x5-video-orientation", "landscape|portrait");
        videoEl.current.setAttribute("x5-playsinline", 'true');
        videoEl.current.setAttribute("x5-video-player-type", 'h5');
      }

      // videoEl.current.setAttribute("x5-video-player-fullscreen", 'false');
    }
  })

  // src 发生变化时候更新
  useEffect(() => {
    if(videoPlayer && videoPlayer.updateMp4Path) {
      videoPlayer.stop();
      videoPlayer.updateMp4Path(props.src)
    }
  }, [props.src])

  //  初始播放器
  useEffect(() => {
      const config = Object.assign({}, props, {
        element: videoEl.current!,
      })
      const vp:any = initPlayer(config);
      setInitState(true);
      onListenerState(vp, 'on');
      setVideoPlayer(vp);
      return () => {
        vp.destroy();
        onListenerState(vp, 'off');
        setInitState(false);
        console.log('====== destroy ======')
      }
  }, [])

  // 监听状态
  const onListenerState = (vp: any, state: 'on'| 'off') => {
    vp[state]('0001', (info: string) => {
      console.log('0001', info)
    })
  }


  return (
  <div ref={containerEl}  className={style.container}>
    <video ref={videoEl} />
    { initState && <UiControl config={props} element={containerEl.current!} videoEl={videoEl.current!}/>}
  </div>);
}

export default VideoPlayer;
export {getVideoPlayer}
