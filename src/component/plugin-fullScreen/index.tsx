import React, { useState, useEffect } from 'react';
import { iconFull, iconExitFull } from '@images/icon';
import { fullScreen, exitFullscreen } from '@utils/fullScreen';
import { deviceType } from '@utils/phoneType';
import style from './style/index.scss';
import { getVideoPlayer } from '@player/index';
import ToolTip from '@g/uiCompoent/toolTip';

interface IProps {
  element: HTMLDivElement;
}

const PlugInFullScreen = (props: IProps) => {
  const [fullState, setFullState] = useState(false);

  // console.log('PlugInFullScreen>>>>>>');

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
      const _d = document as any;
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
    player[state]('fullscreen', (value: boolean) => {
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
    console.log('触发进入全屏：pc', deviceType.pc)
    console.log('触发进入全屏：tbs', deviceType.tbs)
    console.log('deviceType.pc || !deviceType.tbs', deviceType.pc || !deviceType.tbs)
    console.log('=====================')
    console.log('=====================')
    setFullState(true);
    // 如果是ios手机 则使用video进行全屏
    if (deviceType.ios) {
      fullScreen(player.videoEl)
      return
    }

    // 桌面端， 非TBS 浏览器，或者tbs版本036849以下， 使用自带播放器进行播放, 并且不是在Android微信内

    if (deviceType.pc || !deviceType.tbs) {
      // if (deviceType.pc || deviceType.android) {
      console.log('use props.element')
      fullScreen(props.element);
    } else {
      console.log('use props.videoEl')
      fullScreen(player.videoEl)
    }
  };

  return (
    <ToolTip
      node={
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
      } />
  );
};

const areEqual = (prevProps: IProps, nextProps: IProps) => {
  return prevProps.element === nextProps.element;
}


export default React.memo(PlugInFullScreen, areEqual);

