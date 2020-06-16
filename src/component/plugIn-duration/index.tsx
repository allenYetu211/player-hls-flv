import React,{useState, useEffect} from 'react';
import {getVideoPlayer} from '@player/index';
import style from './style/index.scss';

import {msToTime} from '@utils/translateTime';


const PluginDiration = () => {
  const player: any = getVideoPlayer();
  useEffect(() => {
    onListenerState('on');
    return () => {
      onListenerState('off');
    }
  }, []);

  const onListenerState = (state: 'on' | 'off') => {
    player[state]('duration', (duration: string) => {
      setVideoDuration(msToTime(duration));
    }); 
    
    player[state]('playProgress', (duration: string) => {
      setPlayProgress(msToTime(duration));
    });
  };

  const [playProgress, setPlayProgress] = useState<string>('00:00');
  const [videoDuration, setVideoDuration] = useState<string>('00:00');

  return (
    <div className={style.progressBar}>
      {playProgress} {videoDuration === '00:00' ? '' : `/ ${videoDuration}`}
    </div>
  );
};

export default PluginDiration;
