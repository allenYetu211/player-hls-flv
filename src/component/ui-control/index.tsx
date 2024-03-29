/*
 * @Author: Allen OYang
 * @Date: 2021-05-07 10:57:33
 * @Descripttion: 
 * @LastEditTime: 2021-12-13 10:01:42
 * @FilePath: /ts-vp/src/component/ui-control/index.tsx
 */
import React, { useRef, useState } from 'react';

import style from './style/index.scss';

import { initConfig } from '@g/index';

import cn from 'classnames';

import VideoControl from '@g/component/video-control';

import PublignBackgroundImages from '@g/component/plugin-backgorundImg';

import MiddleContainer from '@g/component/plugin-middleContainer';

import VideoKeyBoardAndMouse from '@g/component/video-keyBoardAndMouse';

import VideoBarrage from '@g/component/video-barrage';

// import VideoBarrageDom from '@g/component/video-barrage-dom';

import VideoAntiScreenRecording from '@g/component/video-AntiScreenRecording';

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
  const pel = useRef<HTMLDivElement>(null);
  const switchContainerDisplay = () => {
    setContainerDisplay(!containerDisplay)
  }


  /**
   * @渲染
   */
  return (

    <>
      {
        config.antiScreenRecording && <VideoAntiScreenRecording
          antiScreenRecording={config.antiScreenRecording}
        />
      }
      <VideoKeyBoardAndMouse
        vod={config.vod}
        type={config.type}>
        <div
          ref={pel}
          className={cn(style.container, 'needsclick', {
            [style.display]: config.isMobile! && containerDisplay,
            [style.hover]: !config.isMobile!,
          })}
          onClick={switchContainerDisplay}
        >

          {config.videoBarrage &&
            <VideoBarrage
              videoBarrageConfig={config.videoBarrage}
            />
          }

          {/* {config.videoBarrage &&
            <VideoBarrageDom
              videoBarrageConfig={config.videoBarrage}
            />
          } */}


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
      </VideoKeyBoardAndMouse>
    </>
  );
};

export default UiControl;

