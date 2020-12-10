import React from 'react';
import style from '../plugIn-multiples/style/index.scss';
// import multicodeStyle from './style/index.scss';
import cn from 'classnames';
import { IMultiStreams } from '@interfaces/index';

import ToolTip from '@g/uiCompoent/toolTip';


interface Props {
  playIndex: number;
  multiStreams: IMultiStreams[];
  onChangePlayIndex: (key: number) => void;
}

const PlugInMultiCode = (props: Props) => {
  const { playIndex, multiStreams } = props;
  return (
    <ToolTip text={multiStreams[playIndex].text}>
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

export default PlugInMultiCode;