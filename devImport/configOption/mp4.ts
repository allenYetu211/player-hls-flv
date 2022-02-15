/*
 * @Author: Allen OYang
 * @Date: 2022-02-15 11:39:22
 * @LastEditTime: 2022-02-15 11:50:33
 */


import { initConfig } from '../../src/index';

// 基础MP4 播放

const Mp4ConfigBasic = {
  src: "http://v-vodshare.v.ouchn.cn/vodfiles/sharefiles/live/9680d8af740741c301740a5706be08dc/202008/31140312/25cf0015-421b-48fe-b723-fb2ade2ae243.mp4",
  type: "mp4"
}

const Mp4ConfigThumbnail: initConfig = {
  type: 'mp4',
  // hideRefresh: true,
  multiple: {
    list: [{ text: '001', value: 1 }, { text: '002', value: 2 }, { text: '003', value: 3 }],
    initIndex: 2
  },
  autoplay: false,
  isMobile: false,
  duration: 54918500,
  thumbnail: {
    picture: 'https://testdevcdn.xylink.com/test-video/bimg.jpg',
    count: 12, // 图片总数
    backgroundSize: 3840, // 图片分辨率
  },
  src:
    "http://v-vodshare.v.ouchn.cn/vodfiles/sharefiles/live/9680d8af740741c301740a5706be08dc/202008/31140312/25cf0015-421b-48fe-b723-fb2ade2ae243.mp4",
}


const Mp4Config: initConfig = {
  type: 'mp4',
  hideRefresh: true,
  multiple: {
    list: [{ text: '1x', value: 1 }, { text: '2x', value: 2 }],
    initIndex: 0
  },
  // poster: 'https://i0.hdslb.com/bfs/archive/54bd5adcf8505344fc0ae29422288db7e45af258.png@880w_388h_1c_95q',
  autoplay: false,
  isMobile: false,
  duration: 54918500,
  src:
    "http://v-vodshare.v.ouchn.cn/vodfiles/sharefiles/live/9680d8af740741c301740a5706be08dc/202008/31140312/25cf0015-421b-48fe-b723-fb2ade2ae243.mp4",
  thumbnail: {
    picture: '"http://testdevvoddownload.xylink.com/vodfiles/vodfiles/cloud/9005795481/101-bj2-txdevSig2-2157164404862_0_1602747891243_1920_1080_preview.jpg?auth_key=1603290713-0-0-c4431191c2f139503e88874b4d5ef939"',
    // width: 160,
    // height: 90,
    count: 12, // 图片总数
    backgroundSize: 3840, // 图片分辨率
  }
}


export {
  Mp4Config,
  Mp4ConfigBasic,
  Mp4ConfigThumbnail
}