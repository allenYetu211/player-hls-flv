/*
 * @Author: Allen OYang
 * @Date: 2021-11-16 11:35:55
 * @Descripttion:
 * @LastEditTime: 2021-11-24 11:09:09
 * @FilePath: /ts-vp/src/component/plugin-barrage/index.tsx
 */


import React from 'react';
import HotVideo, { HocVideoType } from '@g/hoc-component/hoc-video';

import { barrageOpen, barrageClose } from '@images/icon';

import style from '@g/asset/style/svg.scss';

import cn from 'classnames';

interface propsType extends HocVideoType {
  defaultBarrageState: boolean;
}

const PluginBarrage: React.FC<propsType> = (props) => {

  const [switchBarrage, setSwitchBarrage] = React.useState<boolean>(props.defaultBarrageState);

  return (
    <div
      className={cn(style.icon,style.barrageIcon)}
      onClick={() => {
        if (switchBarrage) {
          setSwitchBarrage(false);
          props.player.mountFunction.barrage.clean();
        } else {
          setSwitchBarrage(true);
          props.player.mountFunction.barrage.open();
        }
      }}>
      {switchBarrage ? barrageOpen : barrageClose}
    </div>
  )
}

export default HotVideo(PluginBarrage)


