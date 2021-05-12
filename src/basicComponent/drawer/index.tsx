import React, {RefObject, FC} from 'react';
import cn from 'classnames';
// import style from './style/index.scss';
import './style/index.scss';

import DrawerChild, { DrawerChildProps } from './drawer-child';

import Portal from '../../ur-util/portal';

export interface DrawerProps extends DrawerChildProps {
  parentEl?: RefObject<HTMLDivElement>;
};

const Drawer: FC<DrawerProps> = (
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