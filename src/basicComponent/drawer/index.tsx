import React from 'react';
import cn from 'classnames';
// import style from './style/index.scss';
import './style/index.scss';

import DrawerChild, { DrawerChildProps } from './drawer-child';

import Portal from '../../ur-util/portal';

export interface DrawerProps extends DrawerChildProps {
  parentEl?: React.RefObject<HTMLDivElement>;
};

const Drawer: React.FC<DrawerProps> = (
  (props) => {
    return (
      <Portal
        parentEl={props.parentEl}>
        <DrawerChild
          {...props} />
      </Portal>
    )
  })



export default Drawer;