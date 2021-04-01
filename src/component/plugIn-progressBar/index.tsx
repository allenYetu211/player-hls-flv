import React, { useEffect, useState, useRef } from 'react';
import { getVideoPlayer } from '@player/index';
import Slider from 'react-rangeslider';
import style from './style/index.scss';
import { msToTime } from '@utils/translateTime';

import ToolTip from '@g/uiCompoent/toolTip';

import {log} from '@utils/logs';


import cn from 'classnames';


interface IProps {
  onChangeComplete: Function;
  isMobile?: boolean;
  thumbnail?: {
    picture: string;
    width?: number;
    height?: number;
    count: number;
    rowCount?: number;
    backgroundSize: number;
  };
  videoDuration: number;
  playProgress: number;

}

let CURRENTTIME = 0;

const PlugInProgressBar = (props: IProps) => {
  const player: any = getVideoPlayer();

  // 缩略图宽度
  const [PICTRUEHEIGHT, set_PICTRUEHEIGHT] = useState<number>(0);
  const [PICTRUEWIDTH, set_PICTRUEWIDTH] = useState<number>(0);
  const [BACKGORUNDSIZE, set_BACKGORUNDSIZE] = useState<number>(0);
  const [thumbnailWidth, set_thumbnailWidth] = useState<number>(160);

  //  记录滚动时间位置

  useEffect(() => {
    if (props.thumbnail) {
      preload(props.thumbnail!.picture);
      const width = props.thumbnail!.width ? props.thumbnail!.width : 160;
      const height = props.thumbnail!.height ? props.thumbnail!.height : 90;
      const ratio = width / 160;
      set_thumbnailWidth(width);
      set_PICTRUEWIDTH(width / ratio);
      set_PICTRUEHEIGHT(height / ratio);
      set_BACKGORUNDSIZE(props.thumbnail.backgroundSize / ratio)
    }
  }, [])


  const [popContent, setPopContent] = useState<string>('');
  // 测试 开发
  const [cursorElDisplayState, setCursorElDisplayState] = useState<boolean>(false);
  const progressEl = useRef<HTMLDivElement>(null);
  const cursorEl = useRef<HTMLDivElement>(null);
  const thumbnailEl = useRef<HTMLDivElement>(null);
  const thumbnailContainerEl = useRef<HTMLDivElement>(null);



  // 预加载图片
  const preload = (picturePath: string) => {
    const img = new Image();
    img.src = picturePath;
    if (img.complete) {
      log.info('complete')
    } else {
      img.onload = function () {
        log.info('onload')
      };
    }
  }



  //  计算
  const onMouseMove = (e: React.MouseEvent): void => {
    const width = progressEl.current!.offsetWidth;
    const left = progressEl.current!.getBoundingClientRect().left;
    CURRENTTIME = (e.clientX - left) / width * props.videoDuration;
    if (props.thumbnail) {
      const rowCount = props.thumbnail.backgroundSize / thumbnailWidth;
      const clientX = e.clientX - left;
      computePictureMove(width, clientX, props.thumbnail!.count, rowCount);
    }
    //  移动进度条
    computeMove(width, e.clientX, left);
    setPopContent(msToTime(String(CURRENTTIME)))
  };


  // 缩略图位置预览计算
  const computePictureMove = (width: number, clientx: number, count: number, rowCount: number): void => {
    const picturePosition = Math.ceil(clientx / width * count) - 1;
    const pictureRow = Math.floor(picturePosition / rowCount);
    // 计算图片定位显示
    const pictrueX = picturePosition <= rowCount ? PICTRUEWIDTH * picturePosition : PICTRUEWIDTH * (picturePosition - (pictureRow * rowCount));
    const pictrueY = PICTRUEHEIGHT * pictureRow;
    thumbnailEl.current!.style.backgroundPosition = `-${pictrueX}px -${pictrueY}px`;
  }


  const computeMove = (width: number, clinetx: number, left: number): void => {
    const movel = clinetx - left;
    // 控制光标
    cursorEl.current!.style.left = `${movel}px`;

    // 控制缩略图
    if (movel > width / 2) {
      // 向右
      const l = clinetx - left + (PICTRUEWIDTH / 2);
      if (l > width) {
        thumbnailContainerEl.current!.style.left = `-${l - width}px`;
        return
      }
      thumbnailContainerEl.current!.style.left = `0px`
    } else {
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
      onMouseLeave={() => { setCursorElDisplayState(false); }}
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
            player.play()
          }}
          ref={thumbnailContainerEl}
          className={style.notTransitionfocuseContainer}>
          <div
            ref={thumbnailEl}
            style={{
              backgroundImage: props.thumbnail && `url(${props.thumbnail!.picture})`,
              backgroundSize: `${BACKGORUNDSIZE}px`,
              width: PICTRUEWIDTH === 0 ? 'auto' : PICTRUEWIDTH,
              height: PICTRUEHEIGHT === 0 ? 'auto' : PICTRUEHEIGHT,
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
        max={props.videoDuration}
        step={0.1}
        tooltip={false}
        value={props.playProgress}
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
