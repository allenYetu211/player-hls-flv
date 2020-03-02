import React, {useEffect} from 'react';
import {getVideoPlayer} from '@player/index';
import style from './style/index.scss';
import {initConfig} from '@interfaces/vp';
import PlugInVoice from '@g/component/plugIn-voice'
import PlugInPlayBtn from '@g/component/plugIn-playBtn';
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
  useEffect(() => {
    addEventListener();
  }, []);

  const addEventListener = () => {};

  return (
    <div className={style.container}>
      <div
        className={style.controlBar}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <PlugInProgressBar />
        <div>
          <PlugInPlayBtn />
        </div>

        <div className={style.rightContaienr}>
          <PluginMultiple />
          <PlugInVoice />
          <PlugInFullScreen element={props.element} />
        </div>

      </div>
    </div>
  );
};

export default UiControl;
