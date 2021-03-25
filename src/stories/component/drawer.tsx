import React from 'react';
import PluginDrawer, { IProps } from '../../component/plugin-drawer';



export const Drawer: React.FC<IProps> = ((props) => {
  console.log('props', props)
  const divElv = React.useRef<HTMLDivElement>(null);
  return (

    <div ref={divElv}>
      <PluginDrawer
        parentEl={divElv}
        contentPreview={props.contentPreview}
        visible={props.visible}
        open={props.open}
        placement={props.placement} />
    </div>
  )
})

export default Drawer;