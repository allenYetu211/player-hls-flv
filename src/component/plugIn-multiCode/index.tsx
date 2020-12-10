import React from 'react';
import style from '../plugIn-multiples/style/index.scss';
import multicodeStyle from './style/index.scss';
import cn from 'classnames';
import { IMultiStreams} from '@interfaces/index';


interface Props {
  playIndex: number;
  multiStreams: IMultiStreams[];
  onChangePlayIndex: (key: number) => void;
}

const PlugInMultiCode = (props: Props) => {

  const {playIndex, multiStreams } = props;

  return (
    <div
    className={cn(
      style.resolutionContainer,
      style.focusContainer
    )}
  >
    <div className={cn(style.multiple, multicodeStyle.multiStreams)}>{multiStreams[playIndex].text}</div>
    <div className={style.focuseContainer}>
      <div className={cn(style.listContainer, style.focuseChild)}>
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
      </div>
    </div>
  </div>
  )
}

export default PlugInMultiCode;