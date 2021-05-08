/*
 * @Author: Allen OYang
 * @Date: 2021-01-21 11:19:27
 * @Descripttion: 
 * @LastEditTime: 2021-05-08 16:01:00
 * @FilePath: /ts-vp/src/component/plugIn-refresh/index.tsx
 */
import React from 'react';
import {iconRefresh} from '@images/icon';
import style from './style/index.scss';

import { getVideoPlayer } from '@player/index';

// interface IProps {
//   onRefreshPlayer: () => void;
// }

const PlugInRefresh = () => {

  const player = getVideoPlayer();

      /**
   * @刷新done
   */
  const onRefreshPlayer = () => { player.refresh() }


  return (
    <div 
    className={style.icon} 
    onClick={onRefreshPlayer}>
      {iconRefresh}
    </div>
  )
}

// const areEqual =(prevProps: IProps, nextProps: IProps) =>  prevProps.onRefreshPlayer !== nextProps.onRefreshPlayer;

// export default React.memo(PlugInRefresh, areEqual);

export default PlugInRefresh;