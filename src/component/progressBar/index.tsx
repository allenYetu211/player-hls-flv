import React, {useEffect, useState} from 'react';
import {getVideoPlayer} from '@player/index';
import Slider from 'react-rangeslider';
import style from './style/index.scss';
import {msToTime} from '@utils/translateTime';
let progressState: boolean = false;

const ProgressBar = () => {
  const player: any = getVideoPlayer();
  useEffect(() => {
    addEventListener();
  }, []);

  const [videoDuration, setVideoDuration] = useState <number>(0);
  const [playProgress, setPlayProgress] = useState <number> (0);

  const addEventListener = () => {
    player.on('duration', (duration: string) => {
      setVideoDuration(Number(duration));
    });

    player.on('playProgress', (duration: string) => {
      if (!progressState) {
        setPlayProgress(Number(duration));
      }
    });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    // @ts-ignore
    console.log('e offsetWidth', e.target.offsetWidth)
    console.log('e clientX', e.clientX)
    // const left = progressBarEl.current.getBoundingClientRect().left;
    // const result = msToTime(Number((e.clientX - left) / pbElWidth * duration * 1000));
    // onChangePbValue(result);
    // barEl.current.style.left = `${e.clientX - left}px`;
  };

  const onMouseEnter = () => {}
  const onMouseLeave = () => {}

  return (
    <div 
      className={style.progress}
      onMouseMove={(e) => {onMouseMove(e)}}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
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
        }}
      />
    </div>
  );
};

export default ProgressBar;
