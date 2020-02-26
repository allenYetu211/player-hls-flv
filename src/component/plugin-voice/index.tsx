import React, {useState} from 'react';
import cn from 'classnames';
import style from './style/index.scss';
import {getVideoPlayer} from '@player/index';


import {iconVoice, iconVoiceOff} from '@images/icon';
const PluginVoice = () => {

  const player: any = getVideoPlayer();
  const [volume, setVolume] = useState(0.6);

  const onClickMuteVolume = () => {
    if (!volume) {
      player.setVideoVolume(0.6);
      setVolume(0.6)
    } else {
      player.setVideoVolume(0);
      setVolume(0)
    }
  };
  return (
    <div
      className={cn(style.voiceContainer)}
    >
      <div className={style.icon} onClick={onClickMuteVolume}>
        {volume > 0 ? iconVoice : iconVoiceOff}
      </div>

      {/* <div className={style.focuseContainer}>
        <div className={cn(style.volumeBar, style.focuseChild)}>
          <span>{`${volumeConf.value.toFixed(2) * 100}%`}</span>
          <Slider {...volumeConf} />
        </div>
      </div> */}
    </div>
  );
};

export default PluginVoice;
