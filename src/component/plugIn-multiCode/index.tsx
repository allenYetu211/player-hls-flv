/*
 * @Author: Allen OYang
 * @Date: 2021-01-27 11:57:57
 * @Descripttion: 
 * @LastEditTime: 2021-05-08 15:08:53
 * @FilePath: /ts-vp/src/component/plugIn-multiCode/index.tsx
 */
import React, {useState, useEffect} from 'react';
import style from '../plugIn-multiples/style/index.scss';
// import multicodeStyle from './style/index.scss';
import cn from 'classnames';
import { IMultiStreams } from '@interfaces/index';

import { getVideoPlayer } from '@player/index';

import ToolTip from '@g/uiCompoent/toolTip';

import {initConfig} from '@g/index';


interface IProps {
  // playIndex: number;
  // multiStreams: IMultiStreams[];
  // onChangePlayIndex: (key: number) => void;
  config: initConfig
}

const PlugInMultiCode = (props: IProps) => {

  const player: any = getVideoPlayer();
  // const { playIndex, multiStreams } = props;
  // TODO 上下行边际处理
  // React.useEffect(() => {
  //   multiStreams[playIndex]
  // },[props.playIndex])

   //  增加挂载
   useEffect(() => {
    player.mountFunction = {
      onChangePlayIndex
    }
  }, [])

  const [playIndex, setPlayIndex] = useState<number>(props.config.option! ? props.config.option!.playIndex : 0);
  const [multiStreams] = useState<IMultiStreams[]>(props.config.option! ? props.config.option!.multiStreams : [{ src: '', text: '' }]);
  const onChangePlayIndex = (key: number) => {

    // log.debug(`onChangePlayIndex-> ${key}`);

    setPlayIndex(key);
    player.chooseMultiCode(key)
  }



  return (
    <ToolTip node={multiStreams[playIndex] ? multiStreams[playIndex].text : multiStreams[multiStreams.length -1 ].text}>
      <ul>
        {multiStreams.map((item, key) => {
          return (
            <li
              className={cn({
                [style.action]: key === playIndex,
              })}
              key={`${item.text}-${key}`}
              onClick={() => {
                // props.onChangePlayIndex(key);
                onChangePlayIndex(key);
              }}
            >
              {item.text}
            </li>
          );
        })}
      </ul>
    </ToolTip>
  )
}


// const areEqual =(prevProps: IProps, nextProps: IProps) =>  prevProps.playIndex == nextProps.playIndex;

// export default React.memo(PlugInMultiCode, areEqual);

export default PlugInMultiCode;