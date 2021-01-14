import React from 'react';
import style from '../plugIn-multiples/style/index.scss';
// import multicodeStyle from './style/index.scss';
import cn from 'classnames';
import { IMultiStreams } from '@interfaces/index';

import ToolTip from '@g/uiCompoent/toolTip';


interface IProps {
  playIndex: number;
  multiStreams: IMultiStreams[];
  onChangePlayIndex: (key: number) => void;
}

const PlugInMultiCode = (props: IProps) => {
  const { playIndex, multiStreams } = props;
  return (
    <ToolTip node={multiStreams[playIndex].text}>
      <ul>
        {multiStreams.map((item, key) => {
          return (
            <li
              className={cn({
                [style.action]: key === playIndex,
              })}
              key={`${item.text}-${key}`}
              onClick={() => {
                props.onChangePlayIndex(key);
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


const areEqual =(prevProps: IProps, nextProps: IProps) =>  prevProps.playIndex == nextProps.playIndex;

export default React.memo(PlugInMultiCode, areEqual);