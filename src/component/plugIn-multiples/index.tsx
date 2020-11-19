import React, { useState, useEffect, VideoHTMLAttributes } from 'react';
import style from './style/index.scss';
import cn from 'classnames';

import { getVideoPlayer } from '@player/index';
import { IMultiple } from '@interfaces/index';


interface IProps {
  multiple?: IMultiple
}
type multipleType = { text: string, value: number }

const PluginMultiple = (props: IProps) => {

  console.log('props:::', props.multiple);


  const player: any = getVideoPlayer();
  const [multipleIndex, setMultipleIndex] = useState<number>(props.multiple ? props.multiple!.initIndex : 0);
  const [multipleList, setMultipleList] = useState<multipleType[]>(props.multiple ? props.multiple!.list : [
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
    if (props.multiple) {
      // setMultipleList(props.multiple!.list ? props.multiple!.list : multipleList);
      // setMultipleIndex(props.multiple!.initIndex ?  props.multiple!.initIndex  : multipleIndex);
      player.setPlaybackRate(props.multiple!.list ? props.multiple!.list[props.multiple!.initIndex].value : 0);
      onVideoRatechange();
    }
  }, []);


  const onVideoRatechange = () => {
    player.videoEl.addEventListener('ratechange', (e: any) => {
      try {
        const target = multipleList.findIndex((item) => item.value === e.target.playbackRate);
        if (target === -1) {
          // TODO 中间数需要做异常处理
          const lastIndex = multipleList.length - 1;
            if (e.target.playbackRate > multipleList[lastIndex].value) {
              setMultipleIndex(multipleList.length -1);
              player.setPlaybackRate(multipleList[multipleList.length -1].value);
            }

            if (e.target.playbackRate < multipleList[0].value) {
              setMultipleIndex(0);
              player.setPlaybackRate(multipleList[0].value);
            }
          
        } else {
          setMultipleIndex(target);
        }
      } catch (e) {
        console.warn('error: ', e);
      }

    })
  }




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
            {multipleList.map((item: multipleType, key: number) => {
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