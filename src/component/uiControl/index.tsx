/*
 * @Author: Allen OYang
 * @Date: 2021-05-07 10:57:33
 * @Descripttion: 
 * @LastEditTime: 2021-05-08 19:40:13
 * @FilePath: /ts-vp/src/component/uiControl/index.tsx
 */
import React, { useEffect, useState } from 'react';

import style from './style/index.scss';

import { initConfig } from '@g/index';


import cn from 'classnames';

import VideoControl from '@g/component/video-control';

import PublignBackgroundImages from '@g/component/plugin-backgorundImg';

import MiddleContainer from '@g/component/plugin-middleContainer';

// import { log } from '@utils/logs';


interface IPlayer {
  config: initConfig;
  element: HTMLDivElement;
  eel: React.RefObject<HTMLDivElement>;
}

const UiControl = (props: IPlayer) => {
  // 播放器

  const config: initConfig = props.config;
  const [containerDisplay, setContainerDisplay] = useState<boolean>(false);

  const pel = React.useRef<HTMLDivElement>(null);

  const switchContainerDisplay = () => {
    setContainerDisplay(!containerDisplay)
  }


  /**
   * @渲染
   */
  return (

    <div
      ref={pel}
      className={cn(style.container, 'needsclick', {
        [style.display]: config.isMobile! && containerDisplay,
        [style.hover]: !config.isMobile!,
      })}
      onClick={switchContainerDisplay}
    >

      <PublignBackgroundImages
        poster={props.config.poster}
      >

        <MiddleContainer />

        {!config.hideControl &&
          <VideoControl
            config={props.config}
            element={props.element}
            eel={props.eel}
          />
        }

      </PublignBackgroundImages>
    </div>

  );
};

export default UiControl;

