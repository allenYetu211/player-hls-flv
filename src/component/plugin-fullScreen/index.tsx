import React, {useState, useEffect} from 'react';
import {iconFull, iconExitFull} from '@images/icon';
import {fullScreen, exitFullscreen} from '@utils/fullScreen';
import {isIOS} from '@utils/phoneType';
import style from './style/index.scss';

interface IProps {
  element: HTMLDivElement;
  videoEl: HTMLVideoElement;
}

const PlugInFullScreen = (props: IProps) => {
  const [fullState, setFullState] = useState(false);

    // 注册全屏事件
    useEffect(() => {
      props.element!.onfullscreenchange = (event) => {
        if (document.fullscreenElement !== event.target) {
          onExitfullScreen();
        }
      };

       // android 全屏事件
      document.addEventListener('webkitfullscreenchange', (evt) => {
        const _d = document as  any;
        if (!_d.webkitIsFullScreen && evt.srcElement === props.videoEl) {
            onExitfullScreen();
        }
    }, false);
    
    }, []);

    const onExitfullScreen = () => {
      setFullState(false)
      exitFullscreen()
    }

    const onfullScreen = () => {
      setFullState(true);
      fullScreen(props.videoEl)
      // if (isIOS()) {
      //   fullScreen(props.videoEl)
      // } else {
      //   fullScreen(props.element)
      // }
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
