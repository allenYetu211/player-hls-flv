import React, {useEffect, useState} from 'react';
import {getVideoPlayer} from '@player/index';
import style from './style/index.scss';
import {initConfig} from '@interfaces/index';
import PlugInVoice from '@g/component/plugIn-voice'
import PlugInPlayBtn from '@g/component/plugIn-playBtn';
import PlugInDuration from '@g/component/plugIn-duration';
import PlugInProgressBar from '@g/component/plugIn-progressBar'
import PlugInFullScreen from '@g/component/plugIn-fullScreen'
import PluginMultiples from '@g/component/plugIn-multiples';
import PluginMultiCode from '@g/component/plugIn-multiCode';
import {iconLoading} from '@g/images/icon';
import cn from 'classnames';

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
  const [isMultiples,setMultiples] = useState<boolean>(false);
  const [isVoice,setVoice] = useState<boolean>(true);
  const [isFullScreen,setFullScreen] = useState<boolean>(true);
  const [isPluginMultiCode,setPluginMultiCode] = useState<boolean>(false);
  const [isShowPlayering,setShowPlayering] = useState<boolean>(true);
  const [loading,setloading] = useState<boolean>(false);


  useEffect(() => {
    addEventListener();
    controlUi()
  }, []);

  const controlUi = () => {
    if (props.config.type === 'mp4') {
      setMultiples(true);
      setDuration(true);
      setProgressBar(true);
    }

    if (props.config.type === 'flv' || props.config.type === 'hls') {
      setPluginMultiCode(true);
    }

  }

  const addEventListener = () => {
    player.on('play', () => {
      setShowPlayering(false);
    });

    player.on('stop', () => {
      setShowPlayering(true);
    });
    
    // 监听首次点击 只执行一次
    player.once('clickPlay', () => {
        setloading(true);
        setShowPlayering(false);
    });

    player.on('mediaState', (state: boolean) =>{
      if(state) {
        setloading(false);
      } else {
        setloading(true);
      }
    })
  };

  const onChangeComplete = () => {
    setShowPlayering(false);
  }

  return (
    <div className={style.container}>

      <div className={style.middleContainer}>
      { isShowPlayering && isPlayBtn &&  <PlugInPlayBtn notlistener={true} />}

      { !isShowPlayering && loading &&  <div className={cn(style.icon, style.animation)}>
        {iconLoading}
      </div> }
      </div>
      
      <div
        className={style.controlBar}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >


       {isProgressBar && <PlugInProgressBar onChangeComplete={onChangeComplete} />} 


        <div className={style.leftContainer}>
          {isPlayBtn &&  <PlugInPlayBtn />}
          {isDuration &&  <PlugInDuration />}
        </div>

        <div className={style.rightContaienr}>
          {isPluginMultiCode && <PluginMultiCode  option={config.option!}/>}
          {isMultiples && <PluginMultiples />}
          {isVoice && <PlugInVoice />}
          {isFullScreen && <PlugInFullScreen element={props.element} />}
        </div>

      </div>
    </div>
  );
};

export default UiControl;
