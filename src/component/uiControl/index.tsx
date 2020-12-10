import React, { useEffect, useState } from 'react';
import { getVideoPlayer } from '@player/index';
import style from './style/index.scss';
import { initConfig } from '@interfaces/index';
import PlugInVoice from '@g/component/plugIn-voice'
import PlugInPlayBtn from '@g/component/plugIn-playBtn';
import PlugInDuration from '@g/component/plugIn-duration';
import PlugInProgressBar from '@g/component/plugIn-progressBar'
import PlugInFullScreen from '@g/component/plugIn-fullScreen'
import PluginMultiples from '@g/component/plugIn-multiples';
import PluginMultiCode from '@g/component/plugIn-multiCode';
import PluginRefresh from '@g/component/plugIn-refresh';
import { iconLoading } from '@g/images/icon';
import { msToTime } from '@utils/translateTime';
import cn from 'classnames';
import { IMultiStreams } from '@interfaces/index';
// import {deviceType} from '@utils/phoneType';

interface IPlayer {
  config: initConfig;
  element: HTMLDivElement;
}

const UiControl = (props: IPlayer) => {
  // 播放器
  const player: any = getVideoPlayer();
  const config: initConfig = props.config;
  const [isProgressBar, setProgressBar] = useState<boolean>(false);
  const [isDuration, setDuration] = useState<boolean>(false);
  // const [isPlayBtn, setPlayBtn] = useState<boolean>(true);
  const [isMultiples, setMultiples] = useState<boolean>(false);
  const [isVoice, setVoice] = useState<boolean>(true);
  const [isFullScreen, setFullScreen] = useState<boolean>(true);
  const [isPluginMultiCode, setPluginMultiCode] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);
  const [containerDisplay, setContainerDisplay] = useState<boolean>(false);
  const [oncePoster, setOncePoster] = useState<boolean>(true);


  useEffect(() => {
    onListenerState('on');
    controlUi()
    return () => {
      onListenerState('off')
    }
  }, []);


  const controlUi = () => {
    if (props.config.type === 'mp4' || props.config.type === 'dash' || (props.config.type === 'hls' && props.config.vod)) {
      setMultiples(true);
      setDuration(true);
      setProgressBar(true);
    }

    if (props.config.type === 'flv' || (props.config.type === 'hls' && !props.config.vod)) {
      setPluginMultiCode(true);
    }
  }


  const onListenerState = (state: 'on' | 'off') => {
    if (state === 'on') {
      // 监听首次点击 只执行一次
      player.once('clickPlay', () => {
        console.log('clickPlay', loading)
        setloading(true);
        setShowPlayering(false);
        setOncePoster(false);
      });
    }

    player[state]('play', () => {
      console.log('>>>>>>>> play')
      setShowPlayering(false);
    });

    player[state]('stop', () => {
      console.log('>>>>>>>>> stop')
      setShowPlayering(true);
      console.log('onSwitchPlayer>>>>>>', isShowPlayering);
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


  /**
   * @分辨率处理 
   * @组件内部维护基础样式,  
   * @TODO  父级别组件，子组件组合关系。  设置默认值。
   */
  const [playIndex, setPlayIndex] = useState<number>(config.option! ? config.option!.playIndex : 0);
  const [multiStreams, setMultiStreams] = useState<IMultiStreams[]>(config.option! ? config.option!.multiStreams : [{ src: '', text: 'default' }]);
  const onChangePlayIndex = (key: number) => {
    setPlayIndex(key);
    player.chooseMultiCode(key)
  }

  /**
   * @速率切换
   */

  useEffect(() => {
    if (onVideoRatechange) {
      onVideoRatechange()
    }
  }, [])
  const [multipleList] = React.useState<{text: string, value: number}[]>(config.multiple ? config.multiple!.list : [])
  const [multipleIndex, setMultipleIndex] = React.useState<number>(0)
  const onChangeMultipleIndex = (key: number) => {
    setMultipleIndex(key);
    player.setPlaybackRate(multipleList[key].value)
  }

  const onVideoRatechange = () => {
    player.videoEl.addEventListener('ratechange', (e: any) => {
      try {
        const target = multipleList.findIndex((item) => item.value === e.target.playbackRate);
        if (target === -1) {
          // TODO 中间数需要做异常处理
          const lastIndex = multipleList.length - 1;
          if (e.target.playbackRate > multipleList[lastIndex].value) {
            setMultipleIndex(multipleList.length - 1);
            player.setPlaybackRate(multipleList[multipleList.length - 1].value);
          }
          if (e.target.playbackRate < multipleList[0].value) {
            setMultipleIndex(0);
            player.setPlaybackRate(multipleList[0].value);
          }
        } else {
          setMultipleIndex(target);
        }
      } catch (e) {
        console.warn('error: ', e);
      }
    })
  }



  return (
    <div className={cn(style.container, 'needsclick', {
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
            notlistener={true} />
        }

        {!isShowPlayering && loading &&
          //  !oncePoster &&
          <div className={cn(style.icon, style.animation)}>
            {iconLoading}
          </div>
        }

      </div>
      {/* 播放按钮 重构完成1  */}


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
            <PlugInProgressBar
              thumbnail={config.thumbnail}
              isMobile={config.isMobile!}
              onChangeComplete={onChangeComplete}
              videoDuration={videoProgressBarDuration}
              playProgress={playProgressBar}
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
              isMultiples &&
              <PluginMultiples
                index={multipleIndex}
                list={multipleList}
                onChangeMultipleIndex={onChangeMultipleIndex} />
            }

            {!config.isMobile && isVoice && <PlugInVoice isMobile={config.isMobile!} />}
            {isFullScreen && <PlugInFullScreen element={props.element} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default UiControl;
