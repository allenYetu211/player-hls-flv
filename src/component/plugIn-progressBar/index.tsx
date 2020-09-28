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
    count: number;
    rowCount?: number;
    backgroundSize: number;
  };
}





const PlugInProgressBar = (props: IProps) => {
  const player: any = getVideoPlayer();

  // 缩略图宽度
  const [PICTRUEHEIGHT, set_PICTRUEHEIGHT] = useState<number>(0);
  const [PICTRUEWIDTH, set_PICTRUEWIDTH] = useState<number>(0);
  const [BACKGORUNDSIZE, set_BACKGORUNDSIZE] = useState<number>(0);

  //  记录滚动时间位置
  let CURRENTTIME =  0;

  useEffect(() => {
    onListenerState('on');
    return () => {
      onListenerState('off');
    }
  }, []);

  useEffect(() => {
    if (props.thumbnail) {
      const ratio = props.thumbnail?.width / 160;
      set_PICTRUEWIDTH(props.thumbnail.width / ratio);
      set_PICTRUEHEIGHT(props.thumbnail.height / ratio);
      set_BACKGORUNDSIZE(props.thumbnail.backgroundSize / ratio)
    }
  }, [])

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
    const count =
    CURRENTTIME = (e.clientX - left) / width * videoDuration;



    if (props.thumbnail) {
      const rowCount = props.thumbnail.backgroundSize /  props.thumbnail.width;

      computePictureMove(width, e.clientX,  props.thumbnail!.count, rowCount);
    }

    //  移动进度条
    computeMove(width, e.clientX, left);
    setPopContent(msToTime(String(CURRENTTIME)))
  };

  // 缩略图位置预览计算
  const computePictureMove = (width: number, clientx: number,  count: number, rowCount: number): void => {

    const picturePosition = Math.ceil(clientx / width * count);

    const pictureRow = Math.floor(picturePosition / rowCount);

    // 计算图片定位显示
    const pictrueX = picturePosition <= rowCount ? PICTRUEWIDTH * picturePosition : PICTRUEWIDTH * (picturePosition - (pictureRow * rowCount));

    const pictrueY = PICTRUEHEIGHT * pictureRow;
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
              backgroundImage: props.thumbnail && `url(${props.thumbnail!.picture})`,
              backgroundSize: `${BACKGORUNDSIZE}px`,
              width: PICTRUEWIDTH,
              height: PICTRUEHEIGHT,
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
