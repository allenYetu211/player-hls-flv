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

  useEffect(() => {
    if (props.list.length) {
      setMultipleList(props.list);
    }
  }, []);

  return (
    <ToolTip
      node={multipleList[props.index].text}>
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
