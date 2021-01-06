import React, { useState, useEffect, VideoHTMLAttributes } from 'react';
import style from './style/index.scss';
import cn from 'classnames';

// import { getVideoPlayer } from '@player/index';
// import { IMultiple } from '@interfaces/index';


interface IProps {
  // multiple?: IMultiple;
  onChangeMultipleIndex: (key: number) => void;
  index: number;
  list?:  {
    text: string,
    value: number,
  }[]
}

type multipleType = { text: string, value: number }

const defaultList = [
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
]

const PluginMultiple = (props: IProps) => {
  const [multipleList, setMultipleList] = useState<multipleType[]>(defaultList)
  useEffect(() => {
    if (props.list) {
     setMultipleList(props.list);
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
      {/*  UI样式组件分离 */}

      <div className={style.multiple}>{multipleList[props.index].text}</div>
      <div className={style.focuseContainer}>
        <div className={cn(style.listContainer, style.focuseChild)}>
          <ul>
            {multipleList.map((item: multipleType, key: number) => {
              return (
                <li
                  className={cn({
                    [style.action]: key === props.index,
                  })}
                  key={`${item.text}-${key}`}
                  onClick={() => {
                    props.onChangeMultipleIndex(key);
                    // player.setPlaybackRate(item.value)
                    // setMultipleIndex(key);
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