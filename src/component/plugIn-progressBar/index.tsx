import React, { useEffect, useState, useRef } from 'react';
import { getVideoPlayer } from '@player/index';
import Slider from 'react-rangeslider';
import style from './style/index.scss';
import { msToTime } from '@utils/translateTime';

import cn from 'classnames';


interface IProps {
  onChangeComplete: Function;
  isMobile?: boolean;
  thumbnail?: {
    picture: string;
    width: number;
    height: number;
    count: number
  };
}





const PlugInProgressBar = (props: IProps) => {
  const player: any = getVideoPlayer();

  // 缩略图宽度
  const PICTRUEWIDTH = props.thumbnail ? props.thumbnail.width  : 160;

  //  记录滚动时间位置
  let CURRENTTIME =  0;

  useEffect(() => {
    onListenerState('on');
    return () => {
      onListenerState('off');
    }
  }, []);

  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [playProgress, setPlayProgress] = useState<number>(0);
  const [popContent, setPopContent] = useState<string>('');
  const [cursorElDisplayState, setCursorElDisplayState] = useState<boolean>(false);
  const progressEl = useRef<HTMLDivElement>(null);
  const cursorEl = useRef<HTMLDivElement>(null);
  const thumbnailEl = useRef<HTMLDivElement>(null);
  const thumbnailContainerEl = useRef<HTMLDivElement>(null);


  const onListenerState = (state: 'on' | 'off'): void => {
    player[state]('duration', (duration: string) => {
      setVideoDuration(Number(duration));
    });

    player[state]('playProgress', (duration: string): void => {
      setPlayProgress(Number(duration));
    });
  };

  //  计算
  const onMouseMove = (e: React.MouseEvent): void => {
    const width = progressEl.current!.offsetWidth;
    const left = progressEl.current!.getBoundingClientRect().left;
    CURRENTTIME = (e.clientX - left) / width * videoDuration;
    computePictureMove(width, e.clientX);
    //  移动进度条
    computeMove(width, e.clientX, left);
    setPopContent(msToTime(String(CURRENTTIME)))
  };

  // 缩略图位置预览计算
  const computePictureMove = (width: number, clientx: number): void => {
    const picturePosition = Math.ceil(clientx / width * 21);
    const pictureRow = Math.floor(picturePosition / 10);
    // 计算图片定位显示
    const pictrueX = picturePosition <= 10 ? PICTRUEWIDTH * picturePosition : PICTRUEWIDTH * (picturePosition - (pictureRow * 10));
    const pictrueY = 90 * pictureRow;
    thumbnailEl.current!.style.backgroundPosition = `-${pictrueX}px -${pictrueY}px`;
  }


  const computeMove = (width: number, clinetx: number, left: number): void => {
    // 控制光标
    cursorEl.current!.style.left = `${clinetx - left}px`;

    // 控制缩略图
    if (clinetx > width / 2) {
      // 向右
      const l = clinetx - left + (PICTRUEWIDTH / 2);
      if (l > width) {
        thumbnailContainerEl.current!.style.left = `-${l - width}px`;
        return 
      }
      thumbnailContainerEl.current!.style.left = `0px`
    } else if (clinetx < width / 2) {
      // 向左
      const l = clinetx - left - (PICTRUEWIDTH / 2);
      if (l < 0) {
        thumbnailContainerEl.current!.style.left = `${-l}px`;
        return
      }
      thumbnailContainerEl.current!.style.left = `0px`
    } 

  }




  return (
    <div
      ref={progressEl}
      className={cn(style.progress, {
        [style.mobileIndicateBar]: props.isMobile,
      })}
      onMouseMove={(e) => { onMouseMove(e) }}
      onMouseEnter={() => { setCursorElDisplayState(true); }}
      onMouseLeave={() => {setCursorElDisplayState(false);}}
      // onMouseLeave={() => { setCursorElDisplayState(true); }}
    >

      <div
        ref={cursorEl}
        className={cn(style.indicateBar, style.focusContainer, {
          [style.hover]: cursorElDisplayState,
          [style.mobile]: props.isMobile,
        })}>
        <div 
        onClick={() => {
          player.setCurrentTime(CURRENTTIME);
        }}
        
        ref={thumbnailContainerEl} 
        className={style.notTransitionfocuseContainer}>
          <div
            ref={thumbnailEl}
            style={{
              backgroundImage: `url(${props.thumbnail!.picture})`
            }}
            className={cn(style.focuseChild, style.value, {
              [style.thumbnailContainer]: props.thumbnail
            })}
          >
            <span> {popContent} </span>
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
