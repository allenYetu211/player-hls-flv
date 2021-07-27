/*
 * @Author: Allen OYang
 * @Date: 2021-04-13 11:24:30
 * @Descripttion: 
 * @LastEditTime: 2021-05-10 15:11:36
 * @FilePath: /ts-vp/src/ur-util/portal.tsx
 */
// 用于 组件插入dom 节点。

import React from 'react';
import ReactDOM from 'react-dom';


export type PortalRef = {};

export interface PortalProps {
  // didUpdate?: (prevProps: PortalProps) => void;
  // getContainer: () => HTMLElement;
  children?: React.ReactNode;
  parentEl?: React.RefObject<HTMLDivElement>;
}


const Portal = React.forwardRef<PortalRef, PortalProps>((props, ref) => {
  const {
    // didUpdate, getContainer,
    parentEl,
    children } = props;
  const containerRef = React.useRef<HTMLElement>();

  React.useEffect(() => {
    console.log('parentEl:::' , parentEl);

    if (parentEl && parentEl!.current) {
      if (getComputedStyle(parentEl!.current).position === '') {
        parentEl!.current.style.position = 'relative';
      }

      containerRef.current = parentEl!.current;
    } else {
      containerRef.current = document.body;
    }

  }, [])


  return containerRef.current ? ReactDOM.createPortal(children, containerRef.current) : null;
})

export default Portal;
