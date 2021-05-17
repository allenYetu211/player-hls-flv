/*
 * @Author: Allen OYang
 * @Date: 2021-05-08 19:42:36
 * @Descripttion: 
 * @LastEditTime: 2021-05-17 15:56:48
 * @FilePath: /ts-vp/src/component/video-keyBoardAndMouse/index.tsx
 */


import React, { useEffect, useState, useRef, FC } from 'react';

import HotVideo, { HocVideoType } from '@g/hoc-component/hoc-video';

import { useStore } from '@g/store'

import { iconVoice, iconVoiceOff } from '@images/icon';

// import debounce from 'lodash.debounce';

import throttle from 'lodash.throttle';

import style from './style/index.scss';

interface Props extends HocVideoType {
  type: string;
  vod: boolean;
}

let timer: any;
let mouseTimer: any;

let isFocus = false;
let isLive = true;

const VideoKeyBoardAndMouse: FC<Props> = (props) => {
  const { player } = props;
  const { videoEl } = player;

  const [state, dispatch] = useStore();

  const divControlEl = useRef<HTMLDivElement>(null);

  const [volumeState, setVolumeState] = useState<boolean>(false);

  const divElv = useRef<HTMLDivElement>(null);



  useEffect(() => {
    console.log('绑定键盘事件', props);
    addKeyBoardListener();
    handleMouse();
  }, []);

  const addKeyBoardListener = () => {


    if (props.type === 'mp4' || (props.type === 'hls' && props.vod)) {
      isLive = false;
    }

    divControlEl.current!.addEventListener('focus', () => {
      isFocus = true
    })

    divControlEl.current!.addEventListener('blur', () => {
      isFocus = false;
    })


    divControlEl.current!.addEventListener('keydown', (e: KeyboardEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (isFocus && keyBoardEvent[e.keyCode]) {
        keyBoardEvent[e.keyCode]();
      }
    })
  }

  const handleMouse = () => {
    divElv.current!.addEventListener('mousemove',
      throttle(() => {
        clearTimeout(mouseTimer);
        dispatch({ type: 'setControlState', controlState: true });
        divElv.current!.style.cursor = 'default';

        mouseTimer = setTimeout(() => {
          divElv.current!.style.cursor = 'none';
          dispatch({ type: 'setControlState', controlState: false });
        }, 5000)

      }, 1000));

  }


  const handleVolumeState = () => {
    clearTimeout(timer);
    setVolumeState(true)
    timer = setTimeout(() => {
      setVolumeState(false)
    }, 2000)
  }


  const keyBoardEvent: { [index: number]: Function } = {
    // 右 - 控制进度
    37: () => {
      if (isLive) {
        return 
      }
      let value;
      if (videoEl.currentTime - 5 < 0) {
        value = 0
      } else {
        value = videoEl.currentTime - 5;
      }
      props.player.setVideoCurrentTime(value)
    },
    // 左 - 控制进度
    39: () => {
      if (isLive) {
        return 
      }
      let value = videoEl.currentTime + 5;
      props.player.setVideoCurrentTime(value)
    },
    // 上 - 控制音量
    38: () => {
      let value = 1;
      if (videoEl.volume + 0.1 <= 1) {
        value = Number((videoEl.volume + 0.1).toFixed(1))
      }

      dispatch({ type: 'setVolume', volume: value })
      props.player.setVideoVolume(value)
      handleVolumeState()
    },
    // 下 - 控制音量
    40: () => {
      let value = 0;
      if (videoEl.volume - 0.1 >= 0) {
        value = Number((videoEl.volume - 0.1).toFixed(1))
      }

      dispatch({ type: 'setVolume', volume: value })
      props.player.setVideoVolume(value)
      handleVolumeState()

    },
    // 空格 - 暂停开始
    32: () => {
      if (videoEl.paused) {
        player.play();
      } else {
        player.stop();
      }
    },
    // enter
    13: () => {
      return
    },
  }




  return (
    <div tabIndex={-1} ref={divControlEl}>
      {volumeState &&
        <div className={style.contentVolume}>
          <div>
            {state.volume > 0 ? iconVoice : iconVoiceOff}
          </div>
          <div>{state.volume * 100}%</div>
        </div>
      }
      <div style={{ width: '100%', height: '100%' }} ref={divElv}>
        {props.children}
      </div>
    </div>
  )
}

export default HotVideo(VideoKeyBoardAndMouse);