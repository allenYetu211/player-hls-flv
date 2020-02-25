import React, {useEffect} from 'react';
import {getVideoPlayer} from '@player/index';
import style from './style/index.scss';
import {initConfig} from '@interfaces/vp';
import PlayBtn from '@component/playBtn/index';
import ProgressBar from '@component/progressBar'

interface IPlayer {
  config: initConfig,
}

const UiControl = (props: IPlayer) => {
  // 播放器
  let player: any;
  const config: initConfig = props.config;
  useEffect(() => {
    player = getVideoPlayer();
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
        <ProgressBar />
        <PlayBtn />
      </div>
    </div>
  );
};

export default UiControl;
