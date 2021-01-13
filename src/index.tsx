
import React, {useRef, useEffect, useState} from 'react';
import style from './styles.scss';
import {initPlayer, getVideoPlayer} from '@player/index';
import UiControl from '@g/component/uiControl';
import {deviceType} from '@utils/phoneType';

import {logInit , log} from '@utils/logs';


// import Exp from '@g/exp';

export interface initConfig {
  type?: 'flv' | 'hls' | 'mp4' | 'm3u8' | 'dash',
  src?: string;
  autoplay?: boolean;
  option?: IMultiStreamsContainer;
  isMobile?: boolean;
  hideControl?: boolean;
  hideMultiCode?: boolean;
  hideRefresh?: boolean;
  hideMultiple?: boolean;
  hideProgressBar?: boolean;
  onVideoPlayerState?: (vp: any) => void;
  multiple?: IMultiple;
  vod?: boolean;
  poster?: string;
  duration?: number;
  thumbnail?: {
    picture: string;
    width?: number;
    height?: number;
    count: number;
    rowCount?: number;
    backgroundSize: number;
  };
}

export interface IMultiple {
  list: {
    text: string,
    value: number,
  }[],
  initIndex: number
}

export interface IMultiStreams {
  src: string;
  text: string
}

export interface IMultiStreamsContainer {
multiStreams: IMultiStreams[];
playIndex: number;
}



//  初始全局log
logInit('ALL');
log.debug('debug1')
log.info('info1')
log.error('error1')
log.log('log1')
log.debug('debug2')
log.info('info2')
log.error('error2')
log.log('log2')





const VideoPlayer = (props: initConfig) => {

  const videoEl = useRef<HTMLVideoElement>(null);

  const containerEl = useRef<HTMLDivElement>(null);

  const [initState, setInitState] = useState<boolean>(false);

  const [videoPlayer, setVideoPlayer] = useState<any>();

  // src 发生变化时候更新
  useEffect(() => {
    if(videoPlayer && videoPlayer.updateMp4Path) {
      videoPlayer.stop();
      videoPlayer.updateMp4Path(props.src, props.duration)
    }
  }, [props.src, props.duration])

  //  初始播放器
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
        const config = Object.assign({}, props, {
          element: videoEl.current!,
          containerEl: containerEl.current!,
        })


        vp = initPlayer(config);
        setInitState(true);
        onListenerState(vp, 'on');
        setVideoPlayer(vp);
        if (props.onVideoPlayerState) {
          props.onVideoPlayerState(vp);
        }
      }, 100)

      
      return () => {
        vp.destroy();
        // 清除所有监听
        vp.removeAllListeners();
        setInitState(false);
        console.log('====== destroy ======')
      }
  }, [props.type])

  // 监听状态
  const onListenerState = (vp: any, state: 'on'| 'off') => {
    vp[state]('0001', (info: string) => {
      console.log('0001', info)
    })
  }


  return (
  <div ref={containerEl}  className={style.container}>
    { initState && 
      <UiControl 
        config={props} 
        element={containerEl.current!} 
      />}
    {/* <Exp /> */}
    <video  ref={videoEl} />
  </div>);
}

export default VideoPlayer;


// export const withDefaultProps = <
//   P extends object,
//   DP extends Partial<P> = Partial<P>
// >(
//   defaultProps: DP,
//   Cmp: ComponentType<P>,
// ) => {
//   // 提取出必须的属性
//   type RequiredProps = Omit<P, keyof DP>;
//   // 重新创建我们的属性定义，通过一个相交类型，将所有的原始属性标记成可选的，必选的属性标记成可选的
//   type Props = Partial<DP> & Required<RequiredProps>;

//   Cmp.defaultProps = defaultProps;

//   // 返回重新的定义的属性类型组件，通过将原始组件的类型检查关闭，然后再设置正确的属性类型
//   return (Cmp as ComponentType<any>) as ComponentType<Props>;
// };