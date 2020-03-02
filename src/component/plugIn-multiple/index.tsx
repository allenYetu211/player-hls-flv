import React,{useState} from 'react';
import style from './style/index.scss';
import cn from 'classnames';

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

  const [multipleIndex, setMultipleIndex] = useState<number>(0); 
  return (
    <div
    className={cn(
      style.icon,
      style.resolutionContainer,
      style.focusContainer
    )}
  >
    <span>{multiple[multipleIndex].text}</span>
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
                  setMultipleIndex(item.value);
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