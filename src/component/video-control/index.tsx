/*
 * @Author: Allen OYang
 * @Date: 2021-05-08 15:46:11
 * @Descripttion: 
 * @LastEditTime: 2022-02-15 11:08:51
 * @FilePath: /ts-vp/src/component/video-control/index.tsx
 */
import React, { useState, useEffect, useMemo } from 'react';
import { initConfig } from '@g/index';

import PlugInPlayBtn from '@g/component/plugIn-playBtn';
import PlugInVoice from '@g/component/plugIn-voice'
import PlugInDuration from '@g/component/plugIn-duration';
import PlugInProgressBar from '@g/component/plugIn-progressBar'
import PlugInFullScreen from '@g/component/plugIn-fullScreen'
import PluginMultiples from '@g/component/plugIn-multiples';
import PluginMultiCode from '@g/component/plugIn-multiCode';
import PluginRefresh from '@g/component/plugIn-refresh';
import PulginDrawer from '@g/component/plugin-drawer';
import PluginBarrage from '@g/component/plugin-barrage';


import { getVideoPlayer } from '@player/index';

import cn from 'classnames';

import { msToTime } from '@utils/translateTime';

import { useStore } from '@g/store'

import style from './style/index.scss';

interface Props {
  config: initConfig;
  element: HTMLDivElement;
  eel: React.RefObject<HTMLDivElement>;
}


const matchMediaVideoControll = (type: 'flv' | 'hls' | 'mp4' | 'm3u8' | 'dash', matchArr: string[], vod: boolean): boolean => {
  if ((type === 'hls' || type === 'm3u8') && vod) {
    return true
  }
  return matchArr.includes(type!);
}


const VideoControl = (props: Props) => {

  const [state] = useStore();


  const player: any = getVideoPlayer();

  useEffect(() => {
    onListenerState('on');
    controlUi()
    return () => {
      onListenerState('off')
    }
  }, []);

  const onListenerState = (state: 'on' | 'off') => {

    player[state]('duration', (duration: string) => {
      setVideoDuration(msToTime(duration));
    });

    player[state]('playProgress', (duration: string) => {
      setPlayProgress(msToTime(duration));
    });

  };


  const [isProgressBar, setProgressBar] = useState<boolean>(false);
  const [isDuration, setDuration] = useState<boolean>(false);
  const [isMultiples, setMultiples] = useState<boolean>(false);
  const [isFullScreen, setFullScreen] = useState<boolean>(true);
  const [isPluginMultiCode, setPluginMultiCode] = useState<boolean>(false);


  const controlUi = () => {
    if (matchMediaVideoControll(props.config.type || 'mp4', ['mp4', 'dash'], !!props.config.vod)) {
      setMultiples(true);
      setDuration(true);
      setProgressBar(true);
    }

    if (matchMediaVideoControll(props.config.type || "mp4", ['flv'], !props.config.vod)) {
      setPluginMultiCode(true);
    }
  }


  /**
   * @时长显示
   */
  const [playProgress, setPlayProgress] = useState<string>('00:00');
  const [videoDuration, setVideoDuration] = useState<string>('00:00');


  const [cacheValue, setCacheValue] = useState<string>('0%');

  player.on('catchUpdate', (value: string) => {
    setCacheValue(value)
  });



  const controlState = useMemo(() => {
    return state.controlState
  }, [state.controlState])

  return (
    <div
      className={cn(style.controlBar, {
        [style.controlBarShow]: controlState
      })}
      onClick={(e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
      }}>

      <div className={style.leftContainer}>

        <PlugInPlayBtn />

        {!props.config.hideRefresh &&
          <PluginRefresh />}

        {isDuration &&
          <PlugInDuration
            videoDuration={videoDuration}
            playProgress={playProgress} />
        }

      </div>

      {isProgressBar &&
        !props.config.hideProgressBar &&
        <PlugInProgressBar
          thumbnail={props.config.thumbnail}
          isMobile={props.config.isMobile!}
          cacheValue={cacheValue}
        />}

      <div className={style.rightContaienr}>

        {
          // 弹幕开关
          props.config.videoBarrage &&
          <PluginBarrage
            defaultBarrageState={props.config.videoBarrage.defaultBarrageState} />
        }

        {
          !props.config.hideMultiCode &&
          props.config.option && 
          // isPluginMultiCode &&
          // !props.config.vod &&
          <PluginMultiCode
            config={props.config}
          />
        }

        {
          !props.config.hideMultiple &&
          props.config.multiple &&
          <PluginMultiples
            config={props.config}
          />
        }

        {!props.config.isMobile &&
          <PlugInVoice />
        }

        {isFullScreen && <PlugInFullScreen element={props.element} />}

        {/* 导航栏 */}
        {props.config.contentPreview &&
          <PulginDrawer
            parentEl={props.eel}
            contentPreview={props.config.contentPreview}
            prefixCls={'xyel'}
          />}

      </div>
    </div>
  )
}


export default VideoControl;