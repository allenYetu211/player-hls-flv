import React from 'react';
import cn from 'classnames';


export type PortalRef = {};

export interface DrawerChildProps {
  visible?: boolean;
  width?: number | string;
  height?: number | string;
  children?: React.ReactNode;
  placement?: 'left' | 'top' | 'right' | 'bottom';
  open?: boolean;
  duration?: string;
  ease?: string;
  prefixCls?: string;
  childStyles?: React.CSSProperties;
  maskClosable?: boolean;
  onClose?: () => void;
}



const DrawerChild = React.forwardRef<PortalRef, DrawerChildProps>((props, ref) => {

  const {
    width = `300px`,
    height = `100%`,
    placement = "right",
    open = false,
    duration = '0.3s',
    ease = 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
    prefixCls = 'xyel',
    childStyles,
    maskClosable = true,
    onClose,
  } = props;

  const { children } = props;
  const domEl = React.useRef<HTMLDivElement>(null);
  const contentDomEl = React.useRef<HTMLDivElement>(null);
  const [stateOpen, setStateOpen] = React.useState<boolean>(open || false);

  React.useEffect(() => {
    console.log('open', props.open);
    if (props.open) {
      domEl.current!.style.zIndex =  '9999';
    }
    setStateOpen(props.open!);
  }, [props.open])


  // 确认滑动方向
  const getHorizontalBoolAndPlacementName = () => {
    const isHorizontal = placement === 'left' || placement === 'right';
    const placementName = `translate${isHorizontal ? 'X' : 'Y'}`;
    return {
      isHorizontal,
      placementName,
    };
  };

  const { placementName } = getHorizontalBoolAndPlacementName();
  const placementPos =
    placement === 'left' || placement === 'top' ? '-100%' : '100%';
  const transform = stateOpen ? '' : `${placementName}(${placementPos})`;

  // 确定方位
  React.useEffect(() => {
    const transformTransition = `transform ${duration} ${ease}`;
    const del = domEl.current;
    const cel = contentDomEl.current;

    del!.style.transition = transformTransition;
    del!.style.position = `absolute`;

    // del!.style.zIndex = stateOpen ? '0' : `9999`;

    del!.style.top = `0px`;
    del!.style.left = `0px`;
    del!.style.right = `0px`;
    del!.style.bottom = `0px`;

    cel!.style.transition = transformTransition;
    cel!.style.position = `absolute`;
    cel!.style[placement] = `0px`;
    cel!.style.overflow = `auto`;
  }, []);

  const onCloseCallback = () => {
    if (onClose) {
      onClose()
    }
  }


  return (
    <div
      className={cn(`${prefixCls}-drawer-content`, {
        [`${prefixCls}-drawer-content-open`]: stateOpen
      })}
      ref={domEl}
      onClick={() => {
        if (maskClosable) {
          setStateOpen(!stateOpen);
          onCloseCallback();
        }
      }}>
      <div
        className={cn(`${prefixCls}-drawer-child`)}
        ref={contentDomEl}
        onTransitionEnd={() => {
          if (!stateOpen) {
          domEl.current!.style.zIndex = `0`;
        }

        }}
        style={{
          transform,
          width,
          height,
          ...childStyles
        }}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {children}
      </div>
    </div>
  )
})

export default DrawerChild;