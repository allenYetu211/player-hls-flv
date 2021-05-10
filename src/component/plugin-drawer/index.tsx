import React, { useState } from 'react';
import Drawer, { DrawerProps } from '../../basicComponent/drawer';
import preloadImg from '../../utils/preloadImg';

import ToolTip from '@g/uiCompoent/toolTip';
import { msToTime } from '@g/utils/translateTime';
import { iconMenu } from '@images/icon';
// import { getVideoPlayer } from '@player/index';

import HotVideo, { HocVideoType } from '@g/hoc-component/hoc-video';

import style from './style/index.scss';

const pictureSize = 1640;
const pictureWidth = 164;
const pictureHeight = 90;


interface ItemList {
  picture: string
  viewCount: number
  timestap: number[]
}


export interface IProps extends DrawerProps, HocVideoType {
  contentPreview: ItemList;
  onChangeTimestamp?: (value: number) => void;
}



const PluginDrawer: React.FC<IProps> = (
  (props) => {

    // const player: any = getVideoPlayer();

    const { contentPreview } = props;
    const { picture, timestap } = contentPreview;

    const [openDrawerState, setOpenDrawerState] = useState<boolean>(false);
    const onChangeDrawer = () => {
      setOpenDrawerState(!openDrawerState);
    }

    const onChangeTimestamp = (value: number) => {
      props.player.setCurrentTime(value);
      props.player.play();
    }

    //  预加载图片
    React.useEffect(() => {
      preloadImg(picture)
    }, [])

    // 计算图片位置
    const calcultatedPictureValue = (index: number): string => {
      let rowX = index * pictureWidth;
      const column = Math.floor(rowX / pictureSize);
      return `-${rowX - column * pictureSize}px -${column * pictureHeight}px`;
    }

    return (
      <ToolTip
        node={
          <div
            className={style.icon}
            onClick={() => {
              onChangeDrawer()
            }}>
            {iconMenu}
          </div>
        }>

        <Drawer
          parentEl={props.parentEl}
          open={openDrawerState}
          onClose={onChangeDrawer}
          width={`auto`}
          childStyles={{
            backgroundColor: `rgba(0,0,0,.8)`
          }}>
          <div
            className={style.previewContent}
            onTransitionEnd={(e) => {
              e.stopPropagation();
            }}
          >
            {timestap.map((item: number, index: number) => {
              return (
                <div
                  className={style.previewItem}
                  key={index}
                  style={{
                    backgroundImage: `url(${picture})`,
                    backgroundPosition: calcultatedPictureValue(index)
                  }}
                  onClick={() => {
                    onChangeTimestamp(item)
                  }}>
                  <p className={style.previewText}>{msToTime(`${item}`)}</p>
                </div>
              )
            })}
          </div>
        </Drawer>
      </ToolTip>

    )
  })



export default HotVideo(PluginDrawer);