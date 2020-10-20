import React, { useEffect, useState, useContext } from 'react';
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
import cn from 'classnames';

import { GlobalContext } from '@g/store';


// import {deviceType} from '@utils/phoneType';
interface IPlayer {
  element: HTMLDivElement;
}

const UiControl = (props: IPlayer) => {
  const { store } = useContext(GlobalContext);

  // 播放器
  const player: any = getVideoPlayer();
  // const config: initConfig = props.config;
  const [isProgressBar, setProgressBar] = useState<boolean>(false);
  const [isDuration, setDuration] = useState<boolean>(false);
  const [isMultiples, setMultiples] = useState<boolean>(false);
  const [isPluginMultiCode, setPluginMultiCode] = useState<boolean>(false);
  const [isShowPlayering, setShowPlayering] = useState<boolean>(true);
  const [loading, setloading] = useState<boolean>(false);
  const [containerDisplay, setContainerDisplay] = useState<boolean>(false);

  const [isPlayBtn, setPlayBtn] = useState<boolean>(true);
  const [isVoice, setVoice] = useState<boolean>(true);
  const [isFullScreen, setFullScreen] = useState<boolean>(true);


  useEffect(() => {
    onListenerState('on');
    controlUi()
    return () => {
      onListenerState('off')
    }
  }, []);

  const controlUi = () => {
    if (store.type === 'mp4' || (store.type === 'hls' && store.vod)) {
      setMultiples(true);
      setDuration(true);
      setProgressBar(true);
    }

    if (store.type === 'flv' || (store.type === 'hls' && !store.vod)) {
      setPluginMultiCode(true);
    }

  }

  const onListenerState = (state: 'on' | 'off') => {
    if (state === 'on') {
      // 监听首次点击 只执行一次
      player.once('clickPlay', () => {
        setloading(true);
        setShowPlayering(false);
      });
    }

    player[state]('play', () => {
      setShowPlayering(false);
    });

    player[state]('stop', () => {
      setShowPlayering(true);
    });

    player[state]('mediaState', (state: boolean) => {
      if (state) {
        setloading(false);
      } else {
        setloading(true);
      }
    })
  };

  const onChangeComplete = () => {
    setShowPlayering(false);
  }

  const switchContainerDisplay = () => {
    setContainerDisplay(!containerDisplay)
  }

  return (
    <div className={cn(style.container, 'needsclick', {
      [style.display]: store.isMobile! && containerDisplay,
      [style.hover]: !store.isMobile!,
    })}
      onClick={switchContainerDisplay}
    >

      <div className={style.middleContainer}>
        {isShowPlayering && isPlayBtn && <PlugInPlayBtn notlistener={true} />}

        {!isShowPlayering && loading && <div className={cn(style.icon, style.animation)}>
          {iconLoading}
        </div>}
      </div>

      {!store.hideControl && (
        <div
          className={cn(style.controlBar)}
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
          }}
        >

          <div className={style.leftContainer}>
            {isPlayBtn && <PlugInPlayBtn />}
            {!store.hideRefresh && <PluginRefresh />}
            {isDuration && <PlugInDuration />}
          </div>

          {isProgressBar && <PlugInProgressBar onChangeComplete={onChangeComplete} />}
          <div className={style.rightContaienr}>
            {!store.hideMultiCode && isPluginMultiCode && !store.vod && <PluginMultiCode option={store.option!} />}
            {!store.isMobile && isMultiples && <PluginMultiples />}
            {!store.isMobile && isVoice && <PlugInVoice />}
            {isFullScreen && <PlugInFullScreen element={props.element} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default UiControl;
