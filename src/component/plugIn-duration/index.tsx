import React from 'react';
import style from './style/index.scss';

interface IProps {
  videoDuration: string;
  playProgress: string;
}

const PluginDiration = (props: IProps) => {
  const {videoDuration, playProgress} = props;
  return (
    <div className={style.progressBar}>
      {playProgress} {videoDuration === '00:00' ? '' : `/ ${videoDuration}`}
    </div>
  );
};


const areEqual =(prevProps: IProps, nextProps: IProps) => {
  return (prevProps.videoDuration === nextProps.videoDuration)  &&  (prevProps.playProgress === nextProps.playProgress);
}


export default React.memo(PluginDiration, areEqual);
