import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { VideeoPlayer, initConfig } from './vp';

export default {
  title: 'Example/VideoPlayer',
  component: VideeoPlayer,
} as Meta;

const Template: Story<initConfig> = (args) => <VideeoPlayer {...args} />;

export const DefaultVideoPlayer = Template.bind({});
DefaultVideoPlayer.args ={
  type: 'mp4',
  multiple: {
    list: [{ text: '001', value: 1 }, { text: '002', value: 2 }, { text: '003', value: 3 }],
    initIndex: 2
  },
  poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591699097501&di=1f2f4942197f230c198c5fc8eeb6603a&imgtype=0&src=http%3A%2F%2Fwww.sinaimg.cn%2Fgm%2Fcr%2F2014%2F0611%2F3311791356.png',
  autoplay: false,
  isMobile: false,
  duration: 54918500,
  thumbnail: {
    picture: 'http://testdevvoddownload.xylink.com/vodfiles/vodfiles/cloud/9005795481/101-bj2-txdevSig2-2157179905119_0_1608711761713_1280_720_preview.jpg?auth_key=1608818711-0-0-a4f6d74602bfebd790b29dfe5ac3ede8',
    count: 12, // 图片总数
    backgroundSize: 3840, // 图片分辨率
  },
  src:
    "http://v-vodshare.v.ouchn.cn/vodfiles/sharefiles/live/9680d8af740741c301740a5706be08dc/202008/31140036/4f721fd9-2219-4bb0-b9af-12e42acd6913.mp4",
}