import React, {useState, useEffect} from 'react';
import cn from 'classnames';
import style from './style/index.scss';
import {getVideoPlayer} from '@player/index';
import Slider from 'react-rangeslider';

import {iconVoice, iconVoiceOff} from '@images/icon';


interface IProps {
  isMobile?: boolean;
}
const PluginVoice = (props: IProps) => {

  const player: any = getVideoPlayer();
  const [volume, setVolume] = useState(0.6);


  useEffect(() => {
    console.log('onVideoVolumechange');
    onListenerState('on');
    return () => {
        onListenerState('off');
    }
  }, [])

  const onClickMuteVolume = () => {
    if (!volume) {
      setVideoVolume(0.6)
    } else {
      setVideoVolume(0)
    }
  };

  const setVideoVolume = (value: number) => {
    player.setVideoVolume(value);
    setVolume(value)
  }

  const onListenerState = (state: 'on' | 'off') => {
    // 防止刷新导致声音被再次重启
    player[state]('oldVolume', (value: number) => {
      setVideoVolume(value)
    });
  };


  return (
    <div
      className={cn(style.voiceContainer,style.focusContainer, {
        [style.mobile]: props.isMobile
      })}
    >
      <div className={cn(style.icon)} onClick={onClickMuteVolume}>
        {volume > 0 ? iconVoice : iconVoiceOff}
      </div>
      <div className={style.focuseContainer}>
        <div className={cn(style.volumeBar, style.focuseChild)}>
        <span>{`${(volume  as  any).toFixed(2) * 100}%`}</span>
          <Slider 
              min={0}
              max={1}
              step={0.1}
              tooltip={false}
              value={volume}
              orientation='vertical'
              onChange={(value: number) => {
                setVideoVolume(value)
              }}
           />
        </div>
      </div>
    </div>
  );
};

export default PluginVoice;
