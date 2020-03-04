import React, {useEffect, useState, useRef} from 'react';
import {getVideoPlayer} from '@player/index';
import Slider from 'react-rangeslider';
import style from './style/index.scss';
import {msToTime} from '@utils/translateTime';

import cn from 'classnames';


interface IProps {
  onChangeComplete: Function;
}

const PlugInProgressBar = (props:IProps) => {
  const player: any = getVideoPlayer();
  useEffect(() => {
    addEventListener();
  }, []);

  const [videoDuration, setVideoDuration] = useState <number>(0);
  const [playProgress, setPlayProgress] = useState <number> (0);
  const [popContent, setPopContent] = useState<string>('');
  const [cursorElDisplayState, setCursorElDisplayState] = useState<boolean>(false);
  const progressEl = useRef<HTMLDivElement>(null);
  const cursorEl = useRef<HTMLDivElement>(null);

  const addEventListener = () => {
    player.on('duration', (duration: string) => {
      setVideoDuration(Number(duration));
    });

    player.on('playProgress', (duration: string) => {
        setPlayProgress(Number(duration));
    });
  };

  //  计算滚动条
  const onMouseMove = (e: React.MouseEvent) => {
    const width = progressEl.current!.offsetWidth;
    const left = progressEl.current!.getBoundingClientRect().left;
    const result = (e.clientX - left) / width * videoDuration;
    cursorEl.current!.style.left = `${e.clientX - left}px`;
    setPopContent(msToTime(String(result)))
  };

  return (
    <div 
      ref={progressEl}
      className={style.progress}
      onMouseMove={(e) => {onMouseMove(e)}}
      onMouseEnter={() => {setCursorElDisplayState(true);}}
      onMouseLeave={() => {setCursorElDisplayState(false);}}>

      <div
        ref={cursorEl}
        className={cn(style.indicateBar, style.focusContainer, {
          [style.hover]: cursorElDisplayState,
        })}>
        <div className={style.focuseContainer}>
          <div
            className={cn(style.focuseChild, style.value)}
          >
            {popContent}
          </div>
        </div>
      </div>
      <Slider
        min={0}
        max={videoDuration}
        step={0.1}
        tooltip={false}
        value={playProgress}
        onChange={(value: number) => {
          player.setCurrentTime(value);
        }}
        
        onChangeComplete={() => {
          player.play();
          props.onChangeComplete()
        }}
      />
    </div>
  );
};

export default PlugInProgressBar;
