/*
 * @Author: Allen OYang
 * @Date: 2021-05-08 17:26:25
 * @Descripttion: 
 * @LastEditTime: 2021-05-08 18:03:21
 * @FilePath: /ts-vp/src/component/plugin-backgorundImg/index.tsx
 */


import React, {useState, useEffect} from 'react';

import style from './style/index.scss';

import { getVideoPlayer } from '@player/index';

import cn from 'classnames';

interface Props {
  oncePoster?: boolean
  poster?: string
}

const PluginBackgroundImages: React.FC<Props> = (props) => {

  const [oncePoster, setOncePoster] = useState<boolean>(true);
  const player: any = getVideoPlayer();

  useEffect(() => {
    onListenerState('on');
    return () => {
      onListenerState('off')
    }
  }, []);

  const onListenerState = (state: 'on' | 'off') => {
    if (state === 'on') {
      // 监听首次点击 只执行一次
      player.once('clickPlay', () => {
        setOncePoster(false);
      });
    }
  };


  return (
    <div
      className={cn(style.posterContainer, {
      })}
      style={{ backgroundImage: `url(${  oncePoster ?  props.poster : '' })` }}>
      {props.children}
    </div>
  )
}

export default PluginBackgroundImages;
