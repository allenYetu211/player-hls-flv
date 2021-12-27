/*
 * @Author: Allen OYang
 * @Date: 2021-01-22 14:30:13
 * @Descripttion: 
 * @LastEditTime: 2021-12-27 18:04:55
 * @FilePath: /ts-vp/src/uiCompoent/toolTip/index.tsx
 */
import React, { SFC, useState } from 'react';
import style from './style/style.scss';
import cn from 'classnames';


interface Props {
  node?: string | React.ReactNode;
  styles?: any;
  onClick?: () => void;
  notHover?: boolean;
}
const ToolTipComponet: SFC<Props> = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { styles } = props;

  // const classNames = cn(styles, style.resolutionContainer, style.focusContainer, {
  //   [style.focusContainerHover]: !props.notHover
  // });

  // console.log('props.notHover', props.notHover);

  const [isHover, setIsHover] = useState<Boolean>(false);

  return (
    <div
      ref={ref}
      className={
        cn(styles, style.resolutionContainer, style.focusContainer, {
          [style.focusContainerHover]: !props.notHover,
          [style.hover]: isHover,
        })
      }

      onMouseLeave={() => {
        props.notHover && setIsHover(false)
      }}

      onClick={() => {
        props.onClick && props.onClick();
        props.notHover && setIsHover(!isHover);
      }}
    >
      <div
        style={{
          minWidth: '30px'
        }}
        className={cn(style.content)}>{props.node}</div>
      <div className={style.focuseContainer}>
        <div className={cn(style.tipsContainer, style.focuseChild)}>
          {props.children}
        </div>
      </div>
    </div>
  )
})

export default ToolTipComponet;