/*
 * @Author: Allen OYang
 * @Date: 2021-11-16 11:35:55
 * @Descripttion:
 * @LastEditTime: 2021-11-17 18:02:14
 * @FilePath: /ts-vp/src/component/plugin-barrage/index.tsx
 */


import React from 'react';
import HotVideo, { HocVideoType } from '@g/hoc-component/hoc-video';

interface propsType extends HocVideoType {
  defaultBarrageState?: boolean;
}

const PluginBarrage: React.FC<propsType> = (props) => {
  const [switchBarrage, setSwitchBarrage] = React.useState<boolean>(props.defaultBarrageState || true);
  return (
    <div onClick={() => {

      if (switchBarrage) {
        setSwitchBarrage(false);
        props.player.mountFunction.barrage.clean();
      } else {
        setSwitchBarrage(true);
        props.player.mountFunction.barrage.open();

      }
    }}>
      {switchBarrage ? `关闭弹幕` : `开启弹幕`}
    </div>
  )
}

export default HotVideo(PluginBarrage)


