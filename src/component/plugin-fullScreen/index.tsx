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
      console.log('element:::', props.element)
      props.element!.onfullscreenchange = (event) => {
        if (document.fullscreenElement !== event.target) {
          onExitfullScreen();
        }
      };
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
