import React, {useEffect, useState} from 'react';
import {getVideoPlayer} from '@player/index';
import style from './style/index.scss';
import {initConfig} from '@interfaces/index';
import PlugInVoice from '@g/component/plugIn-voice'
import PlugInPlayBtn from '@g/component/plugIn-playBtn';
import PlugInDuration from '@g/component/plugIn-duration';
import PlugInProgressBar from '@g/component/plugIn-progressBar'
import PlugInFullScreen from '@g/component/plugIn-fullScreen'
import PluginMultiple from '@g/component/plugIn-multiple';

interface IPlayer {
  config: initConfig,
  element: HTMLDivElement
}

const UiControl = (props: IPlayer) => {
  // 播放器
  const player: any = getVideoPlayer();
  const config: initConfig = props.config;
  const [isProgressBar,setProgressBar] = useState<boolean>(false);
  const [isDuration,setDuration] = useState<boolean>(false);
  const [isPlayBtn,setPlayBtn] = useState<boolean>(true);
  const [isMultiple,setMultiple] = useState<boolean>(false);
  const [isVoice,setVoice] = useState<boolean>(true);
  const [isFullScreen,setFullScreen] = useState<boolean>(true);
  const [isShowPlayering,setShowPlayering] = useState<boolean>(true);

  useEffect(() => {
    addEventListener();
    controlUi()
  }, []);

  const controlUi = () => {
    if (props.config.type === 'flv') {
     
    }
  }

  const addEventListener = () => {
    player.on('play', () => {
      setShowPlayering(false);
    });

    player.on('stop', () => {
      setShowPlayering(true);
    });
  };

  return (
    <div className={style.container}>

      <div className={style.middlePlayBtn}>
      { isShowPlayering && isPlayBtn &&  <PlugInPlayBtn />}
      </div>
      
      <div
        className={style.controlBar}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >


       {isProgressBar && <PlugInProgressBar />} 


        <div className={style.leftContainer}>
          {isPlayBtn &&  <PlugInPlayBtn />}
          {isDuration &&  <PlugInDuration />}
        </div>

        <div className={style.rightContaienr}>
          {isMultiple && <PluginMultiple />}
          {isVoice && <PlugInVoice />}
          {isFullScreen && <PlugInFullScreen element={props.element} />}
        </div>

      </div>
    </div>
  );
};

export default UiControl;
