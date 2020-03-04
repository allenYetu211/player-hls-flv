import React,{useState} from 'react';
import style from './style/index.scss';
import cn from 'classnames';

import {getVideoPlayer} from '@player/index';

const multiple = [
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
];

const PluginMultiple = () => {
  const player: any = getVideoPlayer();
  const [multipleIndex, setMultipleIndex] = useState<number>(0); 
  return (
    <div
    className={cn(
      style.icon,
      style.resolutionContainer,
      style.focusContainer
    )}
  >
    <div className={style.multiple}>{multiple[multipleIndex].text}</div>
    <div className={style.focuseContainer}>
      <div className={cn(style.listContainer, style.focuseChild)}>
        <ul>
          {multiple.map((item, key) => {
            return (
              <li
                className={cn({
                  [style.action]: key === multipleIndex,
                })}
                key={`${item.text}-${key}`}
                onClick={() => {
                  player.setPlaybackRate(key + 1)
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