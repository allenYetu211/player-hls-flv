import React, { SFC } from 'react';
import style from './style/style.scss';
import cn from 'classnames';


interface Props {
  node?: string | React.ReactNode;
  styles?: any;
  onClick?: () => void;
}
 const ToolTipComponet: SFC<Props>  = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { styles } = props;

  const classNames = cn(styles,  style.resolutionContainer, style.focusContainer);


  return (
    <div
      ref={ref}
      className={classNames}
      onClick={props.onClick}
    >
      <div className={cn(style.content)}>{props.node}</div>
      <div className={style.focuseContainer}>
        <div className={cn(style.tipsContainer, style.focuseChild)}>
          {props.children}
        </div>
      </div>
    </div>
  )
})

export default  ToolTipComponet;