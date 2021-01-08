import React, {useEffect, useState} from 'react';
import {getVideoPlayer} from '@player/index';
import cn from 'classnames';
import style from './style/index.scss';


import {iconVideoPlay, iconVideoStop} from '@images/icon';

interface IProps {
  notlistener?: boolean;
  playerState: boolean;
  onSwitchPlayer: () => void;
}

const PlugInPlayBtn = (props: IProps) => {

  // console.log('props.playerState>>>>>>', props.playerState)
  // 播放状态
  return (
    <div className={cn(style.icon)} onClick={props.onSwitchPlayer}>
      {props.playerState  ?  iconVideoStop : iconVideoPlay}
    </div>
  );
};

const areEqual =(prevProps: IProps, nextProps: IProps) =>  prevProps.playerState == nextProps.playerState;

export default React.memo(PlugInPlayBtn, areEqual);
