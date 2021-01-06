import React from 'react';
import cn from 'classnames';
import style from './style/index.scss';
import Slider from 'react-rangeslider';

import {iconVoice, iconVoiceOff} from '@images/icon';


interface IProps {
  isMobile?: boolean;
  volume: number;
  onChangeVideoVolume: (value: number) => void;
  onSwitchViodVolume: () => void;
}
const PluginVoice = (props: IProps) => {
  const {isMobile, volume, onChangeVideoVolume, onSwitchViodVolume} = props;

  return (
    <div
      className={cn(style.voiceContainer,style.focusContainer, {
        [style.mobile]: isMobile
      })}
    >
      <div className={cn(style.icon)} onClick={onSwitchViodVolume}>
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
                onChangeVideoVolume(value)
              }}
           />
        </div>
      </div>
    </div>
  );
};


const areEqual =(prevProps: IProps, nextProps: IProps) =>  prevProps.volume === nextProps.volume;

export default React.memo(PluginVoice, areEqual);
