/*
 * @Author: Allen OYang
 * @Date: 2021-04-13 11:24:30
 * @Descripttion: 
 * @LastEditTime: 2021-04-19 17:39:10
 * @FilePath: /ts-vp/src/component/plugIn-multiples/index.tsx
 */
import React, { useState, useEffect } from 'react';
import style from './style/index.scss';
import cn from 'classnames';

import ToolTip from '@g/uiCompoent/toolTip';

interface IProps {
  // multiple?: IMultiple;
  onChangeMultipleIndex: (key: number) => void;
  index: number;
  list: {
    text: string,
    value: number,
  }[]
}

type multipleType = { text: string, value: number }

const defaultList = [
  {
    text: '1x',
    value: 1,
  }, {
    text: '2x',
    value: 2,
  }, {
    text: '3x',
    value: 3,
  }
]

const PluginMultiple = (props: IProps) => {
  const [multipleList, setMultipleList] = useState<multipleType[]>(defaultList);

  const {index, onChangeMultipleIndex} = props;

  useEffect(() => {
    if (props.list.length) {
      setMultipleList(props.list);
    }
  }, []);

  return (
    <ToolTip
      node={multipleList[index] ? multipleList[index].text : multipleList[multipleList.length - 1].text}>
      <ul className={style.listContainer}>
        {multipleList.map((item: multipleType, key: number) => {
          return (
            <li
              className={cn({
                [style.action]: key === index,
              })}
              key={`${item.text}-${key}`}
              onClick={() => {
                onChangeMultipleIndex(key);
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


const areEqual =(prevProps: IProps, nextProps: IProps) =>  prevProps.index === nextProps.index;

export default React.memo(PluginMultiple, areEqual);
