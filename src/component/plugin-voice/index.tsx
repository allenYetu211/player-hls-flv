/*
 * @Author: Allen OYang
 * @Date: 2021-01-27 11:57:57
 * @Descripttion: 
 * @LastEditTime: 2021-05-08 14:37:50
 * @FilePath: /ts-vp/src/component/plugIn-voice/index.tsx
 */
import React, { useState } from 'react';
import cn from 'classnames';
import style from './style/index.scss';
import Slider from 'react-rangeslider';
import { iconVoice, iconVoiceOff } from '@images/icon';

import { getVideoPlayer } from '@player/index';

import ToolTip from '@g/uiCompoent/toolTip';


// interface IProps {
//   isMobile?: boolean;
//   volume: number;
//   onChangeVideoVolume: (value: number) => void;
//   onSwitchViodVolume: () => void;
// }
// const PluginVoice = (props: IProps) => {
const PluginVoice = () => {

  const player: any = getVideoPlayer();

  // const { isMobile, volume, onChangeVideoVolume, onSwitchViodVolume } = props;

  const [volume, setVolume] = useState<number>(0.6);
  player.on('oldVolume', (value: number) => {
    onChangeVideoVolume(value)
  });

  const onChangeVideoVolume = (value: number) => {
    player.setVideoVolume(value);
    setVolume(value);
  }

  const onSwitchViodVolume = () => {
    onChangeVideoVolume(volume ? 0 : 0.6);
  }

  return (
    // <div
    //   className={cn(style.voiceContainer, style.focusContainer, {
    //     [style.mobile]: isMobile
    //   })}
    // >
    <ToolTip
      node={
        <div className={cn(style.icon)} onClick={onSwitchViodVolume}>
          {volume > 0 ? iconVoice : iconVoiceOff}
        </div>
      }>
      {/* <div className={style.focuseContainer}> */}
      <div className={cn(style.volumeBar, style.focuseChild)}>
        <span>{`${(volume as any).toFixed(2) * 100}%`}</span>
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
      {/* </div> */}
    </ToolTip>
    // </div>
  );
};


// const areEqual = (prevProps: IProps, nextProps: IProps) => prevProps.volume === nextProps.volume;

// export default React.memo(PluginVoice, areEqual);

export default PluginVoice;
