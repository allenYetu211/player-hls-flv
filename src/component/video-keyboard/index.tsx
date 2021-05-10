/*
 * @Author: Allen OYang
 * @Date: 2021-05-08 19:42:36
 * @Descripttion: 
 * @LastEditTime: 2021-05-10 15:38:23
 * @FilePath: /ts-vp/src/component/video-keyboard/index.tsx
 */


import React, { useEffect,  useState } from 'react';

import HotVideo, { HocVideoType } from '@g/hoc-component/hoc-video';


const keyBoardValue = {
  // 37: `快进 5s`,
  // // 左 - 控制进度
  // 39: `快进 5s`,
  // // 上 - 控制音量
  // 38:,
  // // 下 - 控制音量
  // 40:,
  // // 空格 - 暂停开始
  // 32:
}

const VideoKeyBoard: React.FC<HocVideoType> = (props) => {

  const { player } = props;
  const { videoEl } = player;

  useEffect(() => {
    console.log('绑定键盘事件', props);
    addKeyBoardListener();
  }, []);

  const addKeyBoardListener = () => {
    document.addEventListener('keydown', (e: KeyboardEvent) => {

      if (keyBoardEvent[e.keyCode]) {
        keyBoardEvent[e.keyCode]();
      }

    })
  }

  const controllerProgressControl = (value: number) => {
    videoEl.currentTime = value;
  }


  const keyBoardEvent: { [index: number]: Function } = {
    // 右 - 控制进度
    37: () => {
      let value;
      if (videoEl.currentTime - 5 < 0) {
        value = 0
      } else {
        value = videoEl.currentTime - 5;
      }
      controllerProgressControl(value);
    },
    // 左 - 控制进度
    39: () => {
      let value = videoEl.currentTime + 5;
      controllerProgressControl(value);
    },
    // 上 - 控制音量
    38: () => { 
      useState(`info`);
    },
    // 下 - 控制音量
    40: () => { },
    // 空格 - 暂停开始
    32: () => {
      if (videoEl.paused) {
        player.play();
        return
      }
      player.stop();
    },
    // enter
    13: () => { },
  }

  return (
    <>
      <div>
        {}
      </div>
      {props.children}
    </>
  )
}

export default HotVideo(VideoKeyBoard);