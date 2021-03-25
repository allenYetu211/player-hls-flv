import React from 'react';
import Drawer, { DrawerProps } from '../../basicComponent/drawer';
import preloadImg from '../../utils/preloadImg';

import ToolTip from '@g/uiCompoent/toolTip';
import {msToTime} from '@g/utils/translateTime';
import {  iconMenu } from '@images/icon';

import style from './style/index.scss';

const pictureSize = 1640;
const pictureWidth = 164;
const pictureHeight = 90;


export interface ItemList {
  picture: string
  viewCount: number
  timestap: number[]
}


export interface IProps extends DrawerProps {
  contentPreview: ItemList;
  onChangeTimestamp?: (value: number) => void;
}

const PluginDrawer: React.FC<IProps> = (
  (props) => {
    const { contentPreview } = props;
    const { picture, timestap } = contentPreview;

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
            if (props.onClose) {
              props.onClose()
            }
          }}>
              {iconMenu}
          </div>
        }>

        <Drawer
          {...props}
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

                    if (props.onChangeTimestamp) {
                      props.onChangeTimestamp(item)
                    }

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



export default PluginDrawer;