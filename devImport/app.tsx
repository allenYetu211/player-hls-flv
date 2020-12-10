
import React, {useState} from 'react';
import { hot } from "react-hot-loader/root";

import VideoPlayer from '../src/index';

import {initConfig} from '../src/interfaces';
// import detailsPiscture from './212621588.jpg@.webp';
// https://i0.hdslb.com/bfs/videoshot/212621588.jpg@.webp


const mp4Config3: initConfig = {
  type: 'mp4',
  // hideRefresh: true,
  multiple: {
    list: [{text:'1xx', value:1}, {text: '2xx', value: 2},{text: '3xx', value: 3}],
    initIndex: 1
  },
  poster: 'http://prevoddownload.xylink.com/vodfiles/vodfiles/cloud/9005364858/104-bj2-preSig2ms-2157350101326_0_1604890143166_1280_720.jpg?auth_key=1613656101-0-0-93ade7e62eebadde67cec7ff88699c77',
  autoplay: false,
  isMobile: false,
  duration: 54918500,
  src:
    "http://v-vodshare.v.ouchn.cn/vodfiles/sharefiles/live/9680d8af740741c301740a5706be08dc/202008/31140036/4f721fd9-2219-4bb0-b9af-12e42acd6913.mp4",
}


const mp4Config2: initConfig = {
  type: 'mp4',
  // hideRefresh: false,
  multiple: {
    list: [{text:'1xx', value:1}, {text: '2xx', value: 2}],
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
    list: [{text:'1x', value:1}, {text: '2x', value: 2}],
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
  type: 'hls',
  vod: true,
  autoplay: false,
  isMobile: false,
  src:
    "https://vod.xylink.com/vodfile1/cloud/9006261021/1155662354619_0_1588073014333_1280_720.mp4/index.m3u8?proxysessionid=1804317912,bandwidth=1816980",
}

const flvConfig: initConfig = {
  type: 'flv',
  autoplay: false,
  isMobile: true,
  option: {
    multiStreams: [
      {
        src:'http://presecurelive.ainemo.com/testdevnemo/9628abad7641990f01764ba7428a020f_2.flv?auth_key=cbeb6b8d942a20b7ddaf433d91347913-1607680859-1008e8d4920d48efac7dc5e16c5e716c-',
        text: '标清',
      },
      {
        src:
          'http://presecurelive.ainemo.com/testdevnemo/9628abad7641990f01764ba7428a020f.flv?auth_key=f76809b1d4a191e741c4d150d96cb01a-1607680859-2792bb9669c74333bbeecb0c2d66df63-',
        text: '高清',
      },
    ],
    playIndex: 1,
  },
}


const hlsConfig: initConfig = {
  type: 'hls',
  isMobile: false,
  autoplay: false,
  option: {
    multiStreams: [
      {
        src: "https://prdlive.ainemo.com/prdnemo/9680cd9a73cef8770173d6ec29c9213b.m3u8?auth_key=1598612400-0-0-2a84e400b46a6fc6375f9110a56b1dff",
        text: "小鱼1",
      },
     
    ],
    playIndex: 0,
  },
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
      {text: '2x', value: 2},
      {text: '1.5x', value: 1.5},
      {text: '1x', value: 1},
      {text: '0.5x', value: 0.5},
    ],
    initIndex: 2,
  },
}

const dashConfig: initConfig = {
  type: 'dash',
  src: 'https://ainemo-vodcdn.oss-cn-beijing.aliyuncs.com/vodfiles/sharefiles/dash_single_file/training.mpd',
  isMobile: false,
  multiple: {
    list: [{text:'1xx', value:1}, {text: '2xx', value: 2},{text: '3xx', value: 3}],
    initIndex: 1
  },
  autoplay: false,
  vod: true,
}




const App = () => {
  const [option, setOption] = useState<initConfig>(mp4Config3)

  const choseFlv = () => {
    setOption(flvConfig);
  }
  const choseHLS = () => {
    setOption(hlsConfig);
  }

  const choseMp4Url2 = () => {
    setOption(mp4Config2)
  }

  const onVideoPlayerState = (vp: any) => {
    console.log('vp', vp);

    console.log('vp==>>>>',vp.videoEl.playbackRate = 1)
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
      <VideoPlayer {...option} onVideoPlayerState={onVideoPlayerState}/>
    </div>
  )
 
}

export default hot(App);
