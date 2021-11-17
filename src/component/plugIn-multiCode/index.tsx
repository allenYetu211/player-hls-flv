/*
 * @Author: Allen OYang
 * @Date: 2021-01-27 11:57:57
 * @Descripttion: 
 * @LastEditTime: 2021-11-17 17:42:31
 * @FilePath: /ts-vp/src/component/plugIn-multiCode/index.tsx
 */
import React, { useState, useEffect } from 'react';
import style from '../plugIn-multiples/style/index.scss';
// import multicodeStyle from './style/index.scss';
import cn from 'classnames';
import { IMultiStreams } from '@interfaces/index';

// import { getVideoPlayer } from '@player/index';

import ToolTip from '@g/uiCompoent/toolTip';

import { initConfig } from '@g/index';

import HotVideo, { HocVideoType } from '@g/hoc-component/hoc-video';


interface IProps extends HocVideoType {
  config: initConfig
}

const PlugInMultiCode = (props: IProps) => {

  // const player: any = getVideoPlayer();


  //  增加挂载
  useEffect(() => {
    props.player.mountFunction['onChangePlayIndex'] = onChangePlayIndex;
  }, [])

  const [playIndex, setPlayIndex] = useState<number>(props.config.option! ? props.config.option!.playIndex : 0);
  const [multiStreams] = useState<IMultiStreams[]>(props.config.option! ? props.config.option!.multiStreams : [{ src: '', text: '' }]);
  const onChangePlayIndex = (key: number) => {
    setPlayIndex(key);
    props.player.chooseMultiCode(key)
  }



  return (
    <ToolTip node={multiStreams[playIndex] ? multiStreams[playIndex].text : multiStreams[multiStreams.length - 1].text}>
      <ul>
        {multiStreams.map((item, key) => {
          return (
            <li
              className={cn({
                [style.action]: key === playIndex,
              })}
              key={`${item.text}-${key}`}
              onClick={() => {
                // props.onChangePlayIndex(key);
                onChangePlayIndex(key);
              }}
            >
              {item.text}
            </li>
          );
        })}
      </ul>
    </ToolTip>
  )
}


export default HotVideo(PlugInMultiCode);