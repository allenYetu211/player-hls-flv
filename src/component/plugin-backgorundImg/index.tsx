/*
 * @Author: Allen OYang
 * @Date: 2021-05-08 17:26:25
 * @Descripttion: 
 * @LastEditTime: 2021-05-10 12:04:03
 * @FilePath: /ts-vp/src/component/plugin-backgorundImg/index.tsx
 */


import React, {useState, useEffect, FC} from 'react';

import style from './style/index.scss';

import HotVideo, {HocVideoType} from '@g/hoc-component/hoc-video';

import cn from 'classnames';

interface Props extends HocVideoType {
  oncePoster?: boolean
  poster?: string
}

const PluginBackgroundImages: FC<Props> = (props) => {

  const [oncePoster, setOncePoster] = useState<boolean>(true);

  useEffect(() => {
    onListenerState('on');
    return () => {
      onListenerState('off')
    }
  }, []);

  const onListenerState = (state: 'on' | 'off') => {
    if (state === 'on') {
      // 监听首次点击 只执行一次
      props.player.once('clickPlay', () => {
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

export default HotVideo(PluginBackgroundImages);
