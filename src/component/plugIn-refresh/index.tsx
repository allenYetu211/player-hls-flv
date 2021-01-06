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

const areEqual =(prevProps: IProps, nextProps: IProps) =>  prevProps.onRefreshPlayer !== nextProps.onRefreshPlayer;

export default React.memo(PlugInRefresh, areEqual);