import React from 'react';
import style from './style/style.scss';
import cn from 'classnames';


interface Props {
  text?: string;
  children: JSX.Element;
}
export default (props: Props) => {
  return (
    <div
      className={cn(
        style.resolutionContainer,
        style.focusContainer
      )}
    >
      <div className={cn(style.multiple)}>{props.text}</div>
      <div className={style.focuseContainer}>
        <div className={cn(style.listContainer, style.focuseChild)}>
          {props.children}
        </div>
      </div>
    </div>
  )
}