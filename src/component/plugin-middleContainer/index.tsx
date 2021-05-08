/*
 * @Author: Allen OYang
 * @Date: 2021-05-08 19:30:36
 * @Descripttion: 
 * @LastEditTime: 2021-05-08 19:40:58
 * @FilePath: /ts-vp/src/component/plugin-middleContainer/index.tsx
 */


import React, {useState, useEffect} from 'react';

import PlugInPlayBtn from '@g/component/plugIn-playBtn';

import { iconLoading } from '@g/images/icon';

import { getVideoPlayer } from '@player/index';

import style from './style/index.scss';

import cn from 'classnames';


const MiddleContainer = () => {

  const player: any = getVideoPlayer();

  const [isShowPlayering, setShowPlayering] = useState<boolean>(true);
  const [loading, setloading] = useState<boolean>(false);

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
        setloading(true);
        setShowPlayering(false);
      });
    }

    player[state]('play', () => {
      setShowPlayering(false);
    });

    player[state]('stop', () => {
      setShowPlayering(true);
    });

    // 用户数据展示
    player[state]('mediaState', (state: boolean) => {
      setloading(!state)
    })
  };


  return (
    <>
      <div className={style.middleContainer}>
        {
          isShowPlayering &&
          <PlugInPlayBtn />
        }
        {!isShowPlayering && loading &&
          <div className={cn(style.icon, style.animation)}>
            {iconLoading}
          </div>
        }
      </div>
    </>
  )
}

export default MiddleContainer;