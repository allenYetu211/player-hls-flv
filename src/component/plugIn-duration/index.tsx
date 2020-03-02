import React,{useState, useEffect} from 'react';
import {getVideoPlayer} from '@player/index';
import style from './style/index.scss';

import {msToTime} from '@utils/translateTime';


const PluginDiration = () => {
  const player: any = getVideoPlayer();
  useEffect(() => {
    addEventListener();
  }, []);

  const addEventListener = () => {
    player.on('duration', (duration: string) => {
      setVideoDuration(msToTime(duration));
      console.log('video duration');
    }); 
    
    player.on('playProgress', (duration: string) => {
      setPlayProgress(msToTime(duration));
      console.log('video playProgress');
    });
  };

  const [playProgress, setPlayProgress] = useState<string>('00:00');
  const [videoDuration, setVideoDuration] = useState<string>('00:00');

  return (
    <div className={style.progressBar}>
      {playProgress} / {videoDuration}
    </div>
  );
};

export default PluginDiration;
