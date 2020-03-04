import React,{useState, useEffect} from 'react';
import style from '../plugIn-multiples/style/index.scss';
import multicodeStyle from './style/index.scss';
import cn from 'classnames';
import {getVideoPlayer} from '@player/index';
import {IMultiStreamsContainer, IMultiStreams} from '@interfaces/index';



const PlugInMultiCode = (props: {option:IMultiStreamsContainer}) => {
  const player: any = getVideoPlayer();
  const [playIndex, setPlayIndex] = useState<number>(props.option.playIndex); 
  const [multiStreams, setMultiStreams] = useState<IMultiStreams[]>(props.option.multiStreams); 


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
                  setPlayIndex(key);
                  player.chooseMultiCode(key)
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