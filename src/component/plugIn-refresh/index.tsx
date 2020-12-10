import React from 'react';
import {iconRefresh} from '@images/icon';
import style from './style/index.scss';

interface IProps {
  onRefreshPlayer: () => void;
}

const PlugInRefresh = (props: IProps) => {
  return (
    <div 
    className={style.icon} 
    onClick={props.onRefreshPlayer}>
      {iconRefresh}
    </div>
  )
}

export default PlugInRefresh;