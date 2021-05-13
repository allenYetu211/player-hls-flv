/*
 * @Author: Allen OYang
 * @Date: 2021-04-13 11:24:30
 * @Descripttion: 
 * @LastEditTime: 2021-05-10 14:09:49
 * @FilePath: /ts-vp/src/component/plugIn-multiples/index.tsx
 */
import React, { useState, useEffect } from 'react';
import style from './style/index.scss';
import cn from 'classnames';

import ToolTip from '@g/uiCompoent/toolTip';

import { deviceType } from '@utils/phoneType';

// import { getVideoPlayer } from '@player/index';

import { initConfig } from '@g/index';

import HotVideo, {HocVideoType} from '@g/hoc-component/hoc-video';

let IEIndex = 0;




interface IProps extends HocVideoType {
  config: initConfig
}

type multipleType = { text: string, value: number }



const PluginMultiple = (props: IProps) => {
  useEffect(() => {
    // BUG : issues/2572695  IE11中：拖拽进度video进度时会触发video的ratechange。
    if (deviceType.ie) {
      onIEVideoRatechange()
    }
    IEIndex = props.config.multiple ? props.config.multiple!.initIndex : 0;
  }, [])


  const [multipleList] = useState<{ text: string, value: number }[]>(props.config.multiple ? props.config.multiple!.list : [])
  const [multipleIndex, setMultipleIndex] = useState<number>(props.config.multiple ? props.config.multiple!.initIndex : 0)
  const onChangeMultipleIndex = (key: number) => {
    IEIndex = key;
    setMultipleIndex(key);
  }

  useEffect(() => {
    props.player.setPlaybackRate(multipleList[multipleIndex].value)
  }, [multipleIndex])

  const onIEVideoRatechange = () => {
    //  notice： 当拖拽进度，时候IE 浏览器会默认将速率恢复成1倍播放， 此时进行存储的状态倍数进行对比。重新进行设置。
    props.player.videoEl.addEventListener('ratechange', (e: any) => {
      if (e.target.playbackRate !== multipleList[IEIndex].value) {
        props.player.setPlaybackRate(multipleList[IEIndex].value);
      }
    })
  }


  return (
    <ToolTip
      node={multipleList[multipleIndex] ? multipleList[multipleIndex].text : multipleList[multipleList.length - 1].text}>
      <ul className={style.listContainer}>
        {multipleList.map((item: multipleType, key: number) => {
          return (
            <li
              className={cn({
                [style.action]: key === multipleIndex,
              })}
              key={`${item.text}-${key}`}
              onClick={() => {
                onChangeMultipleIndex(key);
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

export default HotVideo(PluginMultiple);
