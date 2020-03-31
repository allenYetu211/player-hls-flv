import React, {useState, useEffect} from 'react';
import {iconFull, iconExitFull} from '@images/icon';
import {fullScreen, exitFullscreen} from '@utils/fullScreen';
import {deviceType} from '@utils/phoneType';
import style from './style/index.scss';
import {getVideoPlayer} from '@player/index';

interface IProps {
  element: HTMLDivElement;
}

const PlugInFullScreen = (props: IProps) => {
  const [fullState, setFullState] = useState(false);
  // 播放器
  const player: any = getVideoPlayer();
    // 注册全屏事件
    useEffect(() => {
      //  pc 端检测全屏状态， esc 监控当前退出全屏
      props.element!.onfullscreenchange = (event) => {
        if (document.fullscreenElement !== event.target) {
          onExitfullScreen();
        }
      };

       // android 全屏事件
      document.addEventListener('webkitfullscreenchange', (evt) => {
        console.log('webkitfullscreenchange==>>>')
        const _d = document as  any;
        if (!_d.webkitIsFullScreen && evt.srcElement === player.videoEl) {
            onExitfullScreen();
            // 兼容处理
            player.stop()
        }
    }, false);
    }, []);

    useEffect(() => {
            onListenerState('on');
          return () => {
              onListenerState('off');
          }
      }, []);



    const onListenerState = (state: 'on' | 'off') => {
      player[state]('fullscreen', (value:boolean) => {
        setFullState(value);
        if (!value) {
          console.log('listener stop')
          player.stop()
        }
      });
    };


    const onExitfullScreen = () => {
      console.log('=====================')
      console.log('=====================')
      console.log('触发退出全屏：onExitfullScreen')
      console.log('=====================')
      console.log('=====================')
      setFullState(false)
      exitFullscreen()
    }

    const onfullScreen = () => {
      // console.log(player.resourceLoadingState)
      console.log('=====================')
      console.log('=====================')
      console.log('触发进入全屏：onfullScreen', deviceType.pc)
      console.log('=====================')
      console.log('=====================')

      setFullState(true);
      if (deviceType.pc) {
        fullScreen(props.element);
      } else {
        fullScreen(player.videoEl)
      }
    };

  return (
    <div className={style.fullScreenContainer}>
      {fullState ? (
         <div
         className={style.icon}
         onClick={onExitfullScreen}
       >
         {iconExitFull}
       </div>
      ) : (
        <div
        className={style.icon}
        onClick={onfullScreen}
      >
        {iconFull}
      </div>
      )}
    </div>
  );
};

export default PlugInFullScreen;
