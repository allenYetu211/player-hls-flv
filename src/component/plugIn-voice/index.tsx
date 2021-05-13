/*
 * @Author: Allen OYang
 * @Date: 2021-01-27 11:57:57
 * @Descripttion: 
 * @LastEditTime: 2021-05-12 15:25:58
 * @FilePath: /ts-vp/src/component/plugIn-voice/index.tsx
 */
import React, { useState } from 'react';
import cn from 'classnames';
import style from './style/index.scss';
import Slider from 'react-rangeslider';
import { iconVoice, iconVoiceOff } from '@images/icon';

import HotVideo, {HocVideoType} from '@g/hoc-component/hoc-video';

import { useStore } from '@g/store'


import ToolTip from '@g/uiCompoent/toolTip';

const PluginVoice = (props: HocVideoType) => {

  const [state, dispatch] = useStore();

  // const [volume, setVolume] = useState<number>(0.6);

  props.player.on('oldVolume', (value: number) => {
    onChangeVideoVolume(value)
  });

  const onChangeVideoVolume = (value: number) => {
    dispatch({ type: 'setVolume', volume: value })
    props.player.setVideoVolume(value);
  }

  // const onSwitchViodVolume = (value: number) => {
  //   onChangeVideoVolume(value);
  // }

  return (
    <ToolTip
      node={
        <div className={cn(style.icon)} onClick={() => {
          onChangeVideoVolume(state.volume ? 0 : 0.6)
        }}>
          {state.volume > 0 ? iconVoice : iconVoiceOff}
        </div>
      }>
      {/* <div className={style.focuseContainer}> */}
      <div className={cn(style.volumeBar, style.focuseChild)}>
        <span>{`${state.volume.toFixed(2) * 100}%`}</span>
        <Slider
          min={0}
          max={1}
          step={0.1}
          tooltip={false}
          value={state.volume}
          orientation='vertical'
          onChange={(value: number) => {
            onChangeVideoVolume(value)
          }}
        />
      </div>
    </ToolTip>
  );
};



export default HotVideo(PluginVoice);
