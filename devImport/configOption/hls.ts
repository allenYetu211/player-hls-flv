/*
 * @Author: Allen OYang
 * @Date: 2022-02-15 11:31:00
 * @LastEditTime: 2022-02-15 11:51:11
 */

import { initConfig } from '../../src/index';


// 多HLS点播
 const HlsVodConfigMultiStreams: initConfig = {
  type: 'hls',
  autoplay: false,
  isMobile: false,
  vod: true,
  option: {
    multiStreams: [
      {
        src: "http://txdev-vod.xylink.com/vodserver-0/cloud/9000692623/101-bj1-txdevSig1ms-1161854816424_0_1638342338045_1280_720.mp4/index.m3u8?proxysessionid=1805838418,bandwidth=245948",
        text: "小鱼1",
      },
      {
        src: "http://txdev-vod.xylink.com/vodserver-0/cloud/9000692623/101-bj1-txdevSig1ms-1161854816424_0_1638342322914_1280_720.mp4/index.m3u8?proxysessionid=1805838685,bandwidth=285222",
        text: "小鱼2",
      },
      {
        src: "http://txdev-vod.xylink.com/vodserver-0/cloud/9000692623/101-bj1-txdevSig1ms-1161854816424_0_1638342312154_1280_720.mp4/index.m3u8?proxysessionid=1805839251,bandwidth=280934",
        text: "小鱼3",
      }
    ],
    playIndex: 0,
  }
}


//  单个VLS直播
const HlsVodConfigSrc: initConfig = {
  type: 'hls',
  src:
    'http://txdev-vod.xylink.com/vodserver-0/cloud/9000692623/101-bj1-txdevSig1ms-1161854816424_0_1638342338045_1280_720.mp4/index.m3u8?proxysessionid=1805838418,bandwidth=245948',
  autoplay: false,
  poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591699097501&di=1f2f4942197f230c198c5fc8eeb6603a&imgtype=0&src=http%3A%2F%2Fwww.sinaimg.cn%2Fgm%2Fcr%2F2014%2F0611%2F3311791356.png',
  isMobile: false,
  hideMultiCode: true,
  vod: true,
  multiple: {
    list: [
      { text: '2x', value: 2 },
      { text: '1.5x', value: 1.5 },
      { text: '1x', value: 1 },
      { text: '0.5x', value: 0.5 },
    ],
    initIndex: 2,
  },
}


//  单个VLS直播
 const HlsConfigSrc: initConfig = {
  type: 'hls',
  src:
    'http://txdev-vod.xylink.com/vodserver-0/cloud/9000692623/101-bj1-txdevSig1ms-1161854816424_0_1638342338045_1280_720.mp4/index.m3u8?proxysessionid=1805838418,bandwidth=245948',
  autoplay: false,
  poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591699097501&di=1f2f4942197f230c198c5fc8eeb6603a&imgtype=0&src=http%3A%2F%2Fwww.sinaimg.cn%2Fgm%2Fcr%2F2014%2F0611%2F3311791356.png',
  isMobile: false,
  hideMultiCode: true,
  multiple: {
    list: [
      { text: '2x', value: 2 },
      { text: '1.5x', value: 1.5 },
      { text: '1x', value: 1 },
      { text: '0.5x', value: 0.5 },
    ],
    initIndex: 2,
  },
}


// HLS直播
 const HlsLiveConfig: initConfig = {
  type: 'hls',
  autoplay: false,
  isMobile: false,
  option: {
    multiStreams: [
      {
        src: "http://txdev-vod.xylink.com/vodserver-0/cloud/9000692623/101-bj1-txdevSig1ms-1161854816424_0_1638342338045_1280_720.mp4/index.m3u8?proxysessionid=1805838418,bandwidth=245948",
        text: "小鱼1",
      },
      {
        src: "http://txdev-vod.xylink.com/vodserver-0/cloud/9000692623/101-bj1-txdevSig1ms-1161854816424_0_1638342322914_1280_720.mp4/index.m3u8?proxysessionid=1805838685,bandwidth=285222",
        text: "小鱼2",
      },
      {
        src: "http://txdev-vod.xylink.com/vodserver-0/cloud/9000692623/101-bj1-txdevSig1ms-1161854816424_0_1638342312154_1280_720.mp4/index.m3u8?proxysessionid=1805839251,bandwidth=280934",
        text: "小鱼3",
      }
    ],
    playIndex: 0,
  }
}


// 点播弹幕
const isMobile = false;
 const HlsConfigSrcBarrage: initConfig = {
  // defaultBarrageState: false,
  videoBarrage: {
    fontSize: isMobile ? 16 : 20, // 字体大小
    defaultBarrageState: true,
    tracksLine: isMobile ? 2 : 3, // 弹幕轨道数
    trackSpacing: isMobile ? 25 : 30, // 轨道间距
    textSpacing: isMobile ? 10 : 20, // 弹幕间距
    cacheData: 20,
    autoEmpty: true,

  },
  "type": "m3u8",
  "src": 'https://test-cdn.eduzhida.com/vodfiles/sharefiles/vod/609758260756480000.m3u8',
  "autoplay": false,
  "isMobile": false,
  "hideMultiCode": true,
  'timestampUnit': true,
  "multiple":
  {
    "list":
      [{ "text": "2x", "value": 2 },
      { "text": "1.5x", "value": 1.5 },
      { "text": "1.25x", "value": 1.25 },
      { "text": "1x", "value": 1 },
      { "text": "0.5x", "value": 0.5 }],
    "initIndex": 3
  },
  "vod": true,
  thumbnail: {
    picture: '"http://testdevvoddownload.xylink.com/vodfiles/vodfiles/cloud/9005795481/101-bj2-txdevSig2-2157164404862_0_1602747891243_1920_1080_preview.jpg?auth_key=1603290713-0-0-c4431191c2f139503e88874b4d5ef939"',
    // width: 160,
    // height: 90,
    count: 12, // 图片总数
    backgroundSize: 3840, // 图片分辨率
  },
  contentPreview: {
    picture: "https://devcdn.xylink.com/test/dump_img.jpg",
    viewCount: 20,
    timestap: [90937, 124937, 196937, 294637, 394937, 494937, 394937, 494937, 594937, 694937, 794937, 894937, 2294937, 5890937]
  },
}


export {
  HlsVodConfigMultiStreams,
  HlsConfigSrc,
  HlsLiveConfig,
  HlsConfigSrcBarrage,
  HlsVodConfigSrc
}