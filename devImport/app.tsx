

// 兼容IE9-11版本
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
// Promise not defined

import "core-js/stable";
import "regenerator-runtime/runtime";

import React, { useState } from 'react';
import { hot } from "react-hot-loader/root";

import VideoPlayer from '../src/index';

// import { initConfig } from '../src/interfaces';

import { initConfig } from '../src/index';
// import detailsPiscture from './212621588.jpg@.webp';
// https://i0.hdslb.com/bfs/videoshot/212621588.jpg@.webp


const tm: initConfig = { "src": "https://predc2vod.xiaoyuonline.com/vodfiles/downloadfiles/shareLink/9828f93a-8c75-41c6-b6bc-47a2ec64ed73.mp4?auth_key=J_9h7WzpFAnGJeoCfhwTKg&expire=1610015465", "type": "mp4" }


const mp4z = {
  "type": "mp4",
  "src": "https://gxtestqa-res.xylinkedu.com/video/20201202/518802067800723456.mp4?auth_key=1611304333-21-1-96381b9d7203d210ad78d76d4d436943",
  "autoplay": true,
  "isMobile": false,
  "hideMultiCode": true,
  "multiple": {
    "list":
      [{ "text": "2x", "value": 2 }, { "text": "1.5x", "value": 1.5 }, { "text": "1.25x", "value": 1.25 }, { "text": "1x", "value": 1 }, { "text": "0.5x", "value": 0.5 }],
    "initIndex": 3
  }
}

const mp4C = {
  src: "http://prevoddownload.xylink.com/vodfiles/downloadfiles/shareLink/ed21d157-3761-4121-9a53-e32137f14699.mp4?auth_key=1610952382-0-0-911c459c7835b47768a002a61c2382f3",
  type: "mp4"
}

const mp4Config3: initConfig = {
  type: 'mp4',
  // hideRefresh: true,
  multiple: {
    list: [{ text: '001', value: 1 }, { text: '002', value: 2 }, { text: '003', value: 3 }],
    initIndex: 2
  },
  // hideMultiple: true,
  // hideProgressBar: true,
  // poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591699097501&di=1f2f4942197f230c198c5fc8eeb6603a&imgtype=0&src=http%3A%2F%2Fwww.sinaimg.cn%2Fgm%2Fcr%2F2014%2F0611%2F3311791356.png',
  autoplay: false,
  isMobile: false,
  duration: 54918500,
  thumbnail: {
    picture: 'https://testdevcdn.xylink.com/test-video/bimg.jpg',
    // width: 160,
    // height: 90,
    count: 12, // 图片总数
    backgroundSize: 3840, // 图片分辨率
  },
  src:
    "http://testqavoddownload.xylink.com/vodfiles/downloadfiles/shareLink/cf3f247f-18f9-4f91-abc9-bfe80e7da1a9.mp4?auth_key=1610710530-0-0-a31a1e14fd1d0715e4b12226e051d8e8",
}


const mp4Config2: initConfig = {
  type: 'mp4',
  // hideRefresh: false,
  multiple: {
    list: [{ text: '1xx', value: 1 }, { text: '2xx', value: 2 }],
    initIndex: 0
  },
  poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591699097501&di=1f2f4942197f230c198c5fc8eeb6603a&imgtype=0&src=http%3A%2F%2Fwww.sinaimg.cn%2Fgm%2Fcr%2F2014%2F0611%2F3311791356.png',
  autoplay: false,
  isMobile: false,

  src:
    "http://v-vodshare.v.ouchn.cn/vodfiles/sharefiles/live/9680d8af740741c301740a5706be08dc/202008/31140312/25cf0015-421b-48fe-b723-fb2ade2ae243.mp4",
}



const mp4Config: initConfig = {
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
    "http://testdevvoddownload.xylink.com/vodfiles/downloadfiles/shareLink/adf1ad66-1f0d-4e75-9092-fe18d2d884aa.mp4?auth_key=1603276313-0-0-90b9c5fc25a6204ed0a277fae7f483f7",
  thumbnail: {
    picture: '"http://testdevvoddownload.xylink.com/vodfiles/vodfiles/cloud/9005795481/101-bj2-txdevSig2-2157164404862_0_1602747891243_1920_1080_preview.jpg?auth_key=1603290713-0-0-c4431191c2f139503e88874b4d5ef939"',
    // width: 160,
    // height: 90,
    count: 12, // 图片总数
    backgroundSize: 3840, // 图片分辨率
  }
}




// vod 点播
const vodHlsConfig: initConfig = {
  poster: "http://testqacdn.xylink.com/poster/202105/16119087407093887.jpg",
  "type": "m3u8",
  "src": "http://testdevcdn.xylink.com/vodfiles/sharefiles/live/962891b17572fa6a017573ea1ff600c2/202103/26170334/a65e04a9-b92d-42e5-a990-d4b8f843a0f5.m3u8",
  "autoplay": false,
  "isMobile": false,
  "hideMultiCode": true,
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
  contentPreview:{
    picture: "https://devcdn.xylink.com/test/dump_img.jpg",
    viewCount: 20,
    timestap: [90937, 124937, 196937, 294637, 394937, 494937, 394937, 494937, 594937, 694937, 794937, 894937, 2294937, 5890937]
  },
}

const vodHlsConfig2: initConfig = {
  poster: "http://testqacdn.xylink.com/poster/202105/16119087407093887.jpg",
  "type": "m3u8",
  "src": "http://testdevcdn.xylink.com/vodfiles/sharefiles/live/962891b17572fa6a017573ea1ff600c2/202103/26170334/a65e04a9-b92d-42e5-a990-d4b8f843a0f5.m3u8?v=2",
  "autoplay": false,
  "isMobile": false,
  "hideMultiCode": true,
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
  contentPreview:{
    picture: "https://devcdn.xylink.com/test/dump_img.jpg",
    viewCount: 20,
    timestap: [90937, 124937, 196937, 294637, 394937, 494937, 394937, 494937, 594937, 694937, 794937, 894937, 2294937, 5890937]
  },
}

const flvConfig: initConfig = {
  type: 'flv',
  autoplay: false,
  isMobile: true,
  option: {
    multiStreams: [
      {
        src: 'http://prdpulllive.xylink.com/prdnemo/9680d8c276af456f017704a1373e5078.flv?auth_key=46afc9928d4020d484628b4a83b807a5-1610785807-de28f9fded044083966c83cca5cca663-',
        text: '标清',
      },
      {
        src:
          'http://prdpulllive.xylink.com/prdnemo/9680d8c276af456f017704a1373e5078.flv?auth_key=46afc9928d4020d484628b4a83b807a5-1610785807-de28f9fded044083966c83cca5cca663-',
        text: '高清',
      },
    ],
    playIndex: 1,
  },
}


const hlsConfig: initConfig = {
  type: 'hls',
  autoplay: false,
  isMobile: true,
  option: {
    multiStreams: [
      {
        src: "http://prdpulllive.xylink.com/prdnemo/9680d8c877e410780177f19971ed0b80.m3u8?auth_key=472de38c3cf3b5f6e4f189a1c26496b0-1614760238-20a94f758a3344209d8851e9f19c1fa9-",
        text: "小鱼1",
      },
      {
        src: "http://prdpulllive.xylink.com/prdnemo/9680d8c877e410780177f19971ed0b80.m3u8?auth_key=472de38c3cf3b5f6e4f189a1c26496b0-1614760238-20a94f758a3344209d8851e9f19c1fa9-",
        text: "小鱼2",
      }
    ],
    playIndex: 0,
  }
}

const hlsConfigSrc: initConfig = {
  type: 'hls',
  src:
    'https://live.ainemo.com/testdevnemo/ff80808171a4ff980171a7b9d6a20023.m3u8?auth_key=1587750600-0-0-9c8741e8888a406db25474818e1d81b5',
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

const dashConfig: initConfig = {
  type: 'dash',
  src: 'https://ainemo-vodcdn.oss-cn-beijing.aliyuncs.com/vodfiles/sharefiles/dash_single_file/training.mpd',
  isMobile: false,
  multiple: {
    list: [{ text: '1xx', value: 1 }, { text: '2xx', value: 2 }, { text: '3xx', value: 3 }],
    initIndex: 1
  },
  autoplay: false,
  vod: true,
}




const App = () => {
  const [option, setOption] = useState<any>(vodHlsConfig)

  const choseFlv = () => {
    setOption(flvConfig);
  }
  const choseHLS = () => {
    setOption(vodHlsConfig2);
  }

  const choseMp4Url2 = () => {
    setOption(mp4Config2)
  }

  const onVideoPlayerState = (vp: any) => {
    // console.log('vp', vp.destroy);

    // console.log('vp==>>>>', vp.videoEl.playbackRate = 1)
  }

  return (
    <div>
      <button style={{
        position: 'absolute',
        top: '0px',
        left: '0px',
        zIndex: 9999
      }} onClick={choseFlv}>flv</button>

      <button style={{
        position: 'absolute',
        top: '0px',
        left: '100px',
        zIndex: 9999
      }} onClick={choseMp4Url2}>MP4</button>


      <button style={{
        position: 'absolute',
        top: '0px',
        left: '150px',
        zIndex: 9999
      }} onClick={choseHLS}>HLS</button>
      <VideoPlayer {...option} onVideoPlayerState={onVideoPlayerState} />
    </div>
  )

}

export default hot(App);
