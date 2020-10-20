import React,{useState, useEffect, useContext} from 'react';
import style from './style/index.scss';
import cn from 'classnames';

import {getVideoPlayer} from '@player/index';
import {IMultiple} from '@interfaces/index';

import { GlobalContext } from '@g/store';


interface IProps {
  multiple?: IMultiple
}
type multipleType = {text: string, value: number}

const PluginMultiple = (props: IProps) => {

  const { store } = useContext(GlobalContext);


  const player: any = getVideoPlayer();
  const [multipleIndex, setMultipleIndex] = useState<number>(store.multiple  ? store.multiple!.initIndex : 0); 
  const [multipleList, setMultipleList] = useState<multipleType[]>(store.multiple ? store.multiple!.list  : [
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

  useEffect(() => {
    if (store.multiple) {
      setMultipleList(store.multiple!.list ? store.multiple!.list : multipleList)
      setMultipleIndex(store.multiple!.initIndex ?  store.multiple!.initIndex  : multipleIndex)
    }
  }, []);



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