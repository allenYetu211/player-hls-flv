import React, {useState, useEffect} from 'react';
import {iconFull, iconExitFull} from '@images/icon';
import {fullScreen, exitFullscreen} from '@utils/fullScreen';
import {deviceType} from '@utils/phoneType';
import style from './style/index.scss';

interface IProps {
  element: HTMLDivElement;
  videoEl: HTMLVideoElement;
}

const PlugInFullScreen = (props: IProps) => {
  const [fullState, setFullState] = useState(false);

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
        const _d = document as  any;
        console.log('_d.webkitIsFullScreen', _d.webkitIsFullScreen)
        if (!_d.webkitIsFullScreen && evt.srcElement === props.videoEl) {
            onExitfullScreen();
        }
    }, false);
    }, []);

    const onExitfullScreen = () => {
      console.log('onExitfullScreen')
      setFullState(false)
      exitFullscreen()
    }

    const onfullScreen = () => {
      console.log('onfullScreen')
      setFullState(true);
      if (deviceType.pc) {
        fullScreen(props.element);
      } else {
        fullScreen(props.videoEl)
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
