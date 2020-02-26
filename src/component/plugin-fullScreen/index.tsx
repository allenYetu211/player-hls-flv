import React, {useState, useEffect} from 'react';
import {iconFull, iconExitFull} from '@images/icon';
import {fullScreen, exitFullscreen} from '@utils/fullScreen';

import style from './style/index.scss';

interface IProps {
  element: HTMLDivElement
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
    }, []);

    const onExitfullScreen = () => {
      setFullState(false)
      exitFullscreen()
    }

    const onfullScreen = () => {
      setFullState(true);
      fullScreen(props.element)
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
