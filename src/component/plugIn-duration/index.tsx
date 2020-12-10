import React from 'react';
import style from './style/index.scss';

interface Props {
  videoDuration: string;
  playProgress: string;
}

const PluginDiration = (props: Props) => {
  const {videoDuration, playProgress} = props;
  return (
    <div className={style.progressBar}>
      {playProgress} {videoDuration === '00:00' ? '' : `/ ${videoDuration}`}
    </div>
  );
};

export default PluginDiration;
