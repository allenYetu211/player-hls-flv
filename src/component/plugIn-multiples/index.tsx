import React,{useState} from 'react';
import style from './style/index.scss';
import cn from 'classnames';

import {getVideoPlayer} from '@player/index';
import {IMultiple} from '@interfaces/index';


interface IProps {
  multiple?: IMultiple
}
type multipleType = {text: string, value: number}

const PluginMultiple = (props: IProps) => {
  const player: any = getVideoPlayer();
  const [multipleIndex, setMultipleIndex] = useState<number>(props.multiple  ? props.multiple!.initIndex : 0); 
  const [multipleList] = useState<multipleType[]>(props.multiple ? props.multiple!.list  : [
    {
      text: '1x',
      value: 1,
    },
    {
      text: '2x',
      value: 2,
    },
    {
      text: '3x',
      value: 3,
    },
  ])

  console.log('multipleList', props.multiple )
  return (
    <div
    className={cn(
      style.icon,
      style.resolutionContainer,
      style.focusContainer
    )}
  >
    <div className={style.multiple}>{multipleList[multipleIndex].text}</div>
    <div className={style.focuseContainer}>
      <div className={cn(style.listContainer, style.focuseChild)}>
        <ul>
          {multipleList.map((item:multipleType, key: number) => {
            return (
              <li
                className={cn({
                  [style.action]: key === multipleIndex,
                })}
                key={`${item.text}-${key}`}
                onClick={() => {
                  player.setPlaybackRate(item.value)
                  setMultipleIndex(key);
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

export default PluginMultiple;