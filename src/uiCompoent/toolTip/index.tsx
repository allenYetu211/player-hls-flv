import React, { useState } from 'react';
import style from './style/style.scss';
import cn from 'classnames';


interface Props {
  text?: string;
  children: JSX.Element;
  styles?: any;
  onClick?: () => void;
}
export default React.forwardRef<HTMLDivElement, Props>((props, ref) => {

  const { styles } = props;


  const classNames = cn(styles,  style.resolutionContainer, style.focusContainer);


  return (
    <div
      ref={ref}
      className={classNames}
      onClick={props.onClick}
    >
      <div className={cn(style.multiple)}>{props.text}</div>
      <div className={style.focuseContainer}>
        <div className={cn(style.listContainer, style.focuseChild)}>
          {props.children}
        </div>
      </div>
    </div>
  )
})