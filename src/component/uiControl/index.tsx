import React, { useEffect, useState, ChangeEvent } from 'react';
import Player, { getVideoPlayer, videoType } from '@player/index';
import style from './style/index.scss';
// import { initConfig } from '@interfaces/index';

import { initConfig } from '../../index';
import PlugInVoice from '@g/component/plugIn-voice'
import PlugInPlayBtn from '@g/component/plugIn-playBtn';
import PlugInDuration from '@g/component/plugIn-duration';
import PlugInProgressBar from '@g/component/plugIn-progressBar'
import PlugInFullScreen from '@g/component/plugIn-fullScreen'
import PluginMultiples from '@g/component/plugIn-multiples';
import PluginMultiCode from '@g/component/plugIn-multiCode';
import PluginRefresh from '@g/component/plugIn-refresh';
import PulginDrawer from '@g/component/plugin-drawer';
import { iconLoading } from '@g/images/icon';
import { msToTime } from '@utils/translateTime';
import cn from 'classnames';
import { IMultiStreams } from '@interfaces/index';


import { log } from '@utils/logs';
import {deviceType} from '@utils/phoneType';

interface IPlayer {
  config: initConfig;
  element: HTMLDivElement;
  eel: React.RefObject<HTMLDivElement>;
}

type bufferedStateType = {bufferedStart: number;bufferedEnd: number}

const matchMediaVideoControll = (type: 'flv' | 'hls' | 'mp4' | 'm3u8' | 'dash', matchArr: string[], vod: boolean): boolean => {
  if ((type === 'hls' || type === 'm3u8') && vod) {
    return true
  }
  return matchArr.includes(type!);
}



const UiControl = (props: IPlayer) => {
  // 播放器
  const player: any = getVideoPlayer();
  // const player: videoType = getVideoPlayer();
  const config: initConfig = props.config;
  const [isProgressBar, setProgressBar] = useState<boolean>(false);
  const [isDuration, setDuration] = useState<boolean>(false);
  const [isMultiples, setMultiples] = useState<boolean>(false);
  const [isVoice, setVoice] = useState<boolean>(true);
  const [isFullScreen, setFullScreen] = useState<boolean>(true);
  const [isPluginMultiCode, setPluginMultiCode] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);
  const [containerDisplay, setContainerDisplay] = useState<boolean>(false);
  const [oncePoster, setOncePoster] = useState<boolean>(true);
  const pel = React.useRef<HTMLDivElement>(null);


  useEffect(() => {
    onListenerState('on');
    controlUi()
    return () => {
      onListenerState('off')
    }
  }, []);


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


  const onListenerState = (state: 'on' | 'off') => {
    if (state === 'on') {
      // 监听首次点击 只执行一次
      player.once('clickPlay', () => {
        setloading(true);
        setShowPlayering(false);
        setOncePoster(false);
      });
    }

    player[state]('play', () => {
      setShowPlayering(false);
    });

    player[state]('stop', () => {
      setShowPlayering(true);
    });

    // 用户数据展示
    player[state]('mediaState', (state: boolean) => {
      setloading(!state)
    })

    player[state]('duration', (duration: string) => {
      setProgressBarDuration(Number(duration));
      setVideoDuration(msToTime(duration));
    });

    player[state]('playProgress', (duration: string) => {
      setPlayProgressBar(Number(duration));
      setPlayProgress(msToTime(duration));
    });

  };


  const onChangeComplete = () => {
    setShowPlayering(false);
  }


  const switchContainerDisplay = () => {
    setContainerDisplay(!containerDisplay)
  }


  /**
   *  @播放
   */
  const [isShowPlayering, setShowPlayering] = useState<boolean>(true);
  const [playerState, setPlayerState] = useState<boolean>(false);
  player.on('play', () => {
    setPlayerState(true);
  });

  player.on('stop', () => {
    setPlayerState(false);
  });

  const onSwitchPlayer = () => {
    if (playerState) {
      player.stop()
    } else {
      player.play()
    }
  }


  /**
   * @刷新done
   */
  const onRefreshPlayer = () => { player.refresh() }


  /**
   * @时长显示
   */
  const [playProgress, setPlayProgress] = useState<string>('00:00');
  const [videoDuration, setVideoDuration] = useState<string>('00:00');


  /**
   * @进度条 
   */
  
  const [videoProgressBarDuration, setProgressBarDuration] = useState<number>(0);
  const [playProgressBar, setPlayProgressBar] = useState<number>(0);
  const [cacheValue, setCacheValue] = useState<string>('0%');
  // const [ bufferedState, setBufferedState] = useState<bufferedStateType>({
  //   bufferedStart: 0,
  //   bufferedEnd: 0
  // })

  player.on('catchUpdate', (value: string) => {
    setCacheValue(value)
  });


  /**
   * @分辨率处理 
   * @组件内部维护基础样式,  
   * @TODO  父级别组件，子组件组合关系。  设置默认值。
   */
  const [playIndex, setPlayIndex] = useState<number>(config.option! ? config.option!.playIndex : 0);
  const [multiStreams] = useState<IMultiStreams[]>(config.option! ? config.option!.multiStreams : [{ src: '', text: '' }]);
  const onChangePlayIndex = (key: number) => {

    log.debug(`onChangePlayIndex-> ${key}`);

    setPlayIndex(key);
    player.chooseMultiCode(key)
  }

  /**
   * @速率切换
   */

  useEffect(() => {
    // BUG : issues/2572695  IE11中：拖拽进度video进度时会触发video的ratechange。
    
    // if (onVideoRatechange) {
    //   onVideoRatechange()
    // }
    console.log('deviceType.ie', deviceType.ie)
    if (deviceType.ie) {
      onIEVideoRatechange()
    }
  }, [])


  const [multipleList] = React.useState<{ text: string, value: number }[]>(config.multiple ? config.multiple!.list : [])
  const [multipleIndex, setMultipleIndex] = React.useState<number>(config.multiple ? config.multiple!.initIndex : 0)
  const onChangeMultipleIndex = (key: number) => {
    log.debug(`key-> ${key}`);
    // console.log(`key-> ${key}`);
    setMultipleIndex(key);
    console.log('multipleList[key].value', multipleList[key].value);
    player.setPlaybackRate(multipleList[key].value)
  }

  const onIEVideoRatechange = () => {
    //  notice： 当拖拽进度，时候IE 浏览器会默认将速率恢复成1倍播放， 此时进行存储的状态倍数进行对比。重新进行设置。
    player.videoEl.addEventListener('ratechange', (e: any) => {
      if (e.target.playbackRate !== multipleIndex) {
        player.setPlaybackRate(multipleIndex);
      }
    })
  }

  // const onVideoRatechange = () => {
  //   player.videoEl.addEventListener('ratechange', (e: any) => {

  //     try {
  //       const target = multipleList.findIndex((item) => item.value === e.target.playbackRate);
  //       if (target === -1) {
  //         // TODO 中间数需要做异常处理
  //         const lastIndex = multipleList.length - 1;
  //         if (e.target.playbackRate > multipleList[lastIndex].value) {
  //           setMultipleIndex(multipleList.length - 1);
  //           player.setPlaybackRate(multipleList[multipleList.length - 1].value);
  //         }
  //         if (e.target.playbackRate < multipleList[0].value) {
  //           setMultipleIndex(0);
  //           player.setPlaybackRate(multipleList[0].value);
  //         }
  //       } else {
  //         setMultipleIndex(target);
  //       }
  //     } catch (e) {
  //       console.warn('error: ', e);
  //     }
  //   })
  // }


  /**
   * @声音控制
   */
  const [volume, setVolume] = useState<number>(0.6);
  player.on('oldVolume', (value: number) => {
    onChangeVideoVolume(value)
  });

  const onChangeVideoVolume = (value: number) => {
    player.setVideoVolume(value);
    setVolume(value);
  }

  const onSwitchViodVolume = () => {
    onChangeVideoVolume(volume ? 0 : 0.6);
  }

  /**
   * @导航栏
   */
  const [openDrawerState, setOpenDrawerState] = useState<boolean>(false);
  const onChangeDrawer = () => {
    console.log('onChangeDrawer', openDrawerState)
    setOpenDrawerState(!openDrawerState);
  }

  const onChangeTimestamp = (value: number) => {
    player.setCurrentTime(value);
    player.play();
    // setPlayProgressBar(value)
  }

  // console.log('playProgress')


  /**
   * @渲染
   */
  return (
    <div

      ref={pel}
      className={cn(style.container, 'needsclick', {
        [style.display]: config.isMobile! && containerDisplay,
        [style.hover]: !config.isMobile!,
      })}
      onClick={switchContainerDisplay}
    >
      {/* 播放按钮 重构完成1 */}
      <div className={style.middleContainer}>
        {/* 
         控制 中间播放按钮。
         */}
        {
          isShowPlayering &&
          <PlugInPlayBtn
            onSwitchPlayer={onSwitchPlayer}
            playerState={playerState}
          />
        }

        {!isShowPlayering && loading &&
          <div className={cn(style.icon, style.animation)}>
            {iconLoading}
          </div>
        }

      </div>

      {/* video 背景缩略图 */}
      {props.config.poster &&
        <div className={cn(style.posterContainer, {
          [style.posterHide]: !oncePoster
        })} style={{ backgroundImage: `url(${props.config.poster})` }}></div>
      }

      {!props.config.hideControl && (
        <div
          className={cn(style.controlBar)}
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
          }}>

          <div className={style.leftContainer}>

            <PlugInPlayBtn
              onSwitchPlayer={onSwitchPlayer}
              playerState={playerState} />

            {!config.hideRefresh &&
              <PluginRefresh onRefreshPlayer={onRefreshPlayer} />}

            {isDuration &&
              <PlugInDuration
                videoDuration={videoDuration}
                playProgress={playProgress} />
            }

          </div>

          {isProgressBar &&
            !config.hideProgressBar &&
            <PlugInProgressBar
              thumbnail={config.thumbnail}
              isMobile={config.isMobile!}
              onChangeComplete={onChangeComplete}
              videoDuration={videoProgressBarDuration}
              playProgress={playProgressBar}
              cacheValue={cacheValue}
              // bufferedStart={bufferedState.bufferedStart}
              // bufferedEnd={bufferedState.bufferedEnd}
            />}

          <div className={style.rightContaienr}>

            {
              !config.hideMultiCode &&
              isPluginMultiCode &&
              !config.vod &&
              <PluginMultiCode
                playIndex={playIndex}
                multiStreams={multiStreams}
                onChangePlayIndex={onChangePlayIndex} />
            }

            {!config.isMobile &&
              !config.hideMultiple &&
              isMultiples &&
              <PluginMultiples
                index={multipleIndex}
                list={multipleList}
                onChangeMultipleIndex={onChangeMultipleIndex} />
            }

            {!config.isMobile && isVoice &&
              <PlugInVoice
                isMobile={config.isMobile!}
                volume={volume}
                onChangeVideoVolume={onChangeVideoVolume}
                onSwitchViodVolume={onSwitchViodVolume}
              />}

            {isFullScreen && <PlugInFullScreen element={props.element} />}


            {/* 导航栏 */}
            {config.contentPreview && <PulginDrawer
              parentEl={props.eel}
              open={openDrawerState}
              onClose={onChangeDrawer}
              onChangeTimestamp={onChangeTimestamp}
              contentPreview={config.contentPreview}
              prefixCls={'xyel'}
            />}

          </div>
        </div>
      )}
    </div>
  );
};

export default UiControl;

