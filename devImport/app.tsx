
import React, {useState} from 'react';
import { hot } from "react-hot-loader/root";

import VideoPlayer from '../src/index';

import {initConfig} from '../src/interfaces';
// import detailsPiscture from './212621588.jpg@.webp';
// https://i0.hdslb.com/bfs/videoshot/212621588.jpg@.webp


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
    "http://testdevvoddownload.xylink.com/vodfiles/downloadfiles/shareLink/adf1ad66-1f0d-4e75-9092-fe18d2d884aa.mp4?auth_key=1602936082-0-0-641156cb88592f0ee6c61ff9113c7526",
  thumbnail: {
    picture: 'http://testdevvoddownload.xylink.com/vodfiles/vodfiles/cloud/9005795481/101-bj2-txdevSig2-2157164404862_0_1602747891243_1920_1080_preview.jpg?auth_key=1602949766-0-0-80ea255c73cf82d634b69eea2c01b7ac',
    // width: 160,
    // height: 90,
    count: 12, // 图片总数
    backgroundSize: 3840, // 图片分辨率
  }
}

const mp4Config2: initConfig = {
  type: 'mp4',
  hideRefresh: false,
  multiple: {
    list: [{text:'1xx', value:1}, {text: '2xx', value: 2}],
    initIndex: 0
  },
  poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591699097501&di=1f2f4942197f230c198c5fc8eeb6603a&imgtype=0&src=http%3A%2F%2Fwww.sinaimg.cn%2Fgm%2Fcr%2F2014%2F0611%2F3311791356.png',
  autoplay: false,
  isMobile: false,
  src:
    "https://pre-res.xylinkedu.com/video/425663056429711360.mp4",
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
        src:'http://prdsecurelive.ainemo.com/prdnemo/2c949a2971ada78c0171f2563f835f35.flv?auth_key=45cb07cb837b032b36e8b8174de25bab-1589004009-fe3bc305f8da457e91765d3612c7fcf0-',
        text: '标清',
      },
      {
        src:
          'http://prdsecurelive.ainemo.com/prdnemo/2c949a2971ada78c0171f2563f835f35.flv?auth_key=45cb07cb837b032b36e8b8174de25bab-1589004009-fe3bc305f8da457e91765d3612c7fcf0-',
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
  src: 'https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd',
  isMobile: false,
  vod: true,
  hideMultiCode: false,
}




const App = () => {
  const [option, setOption] = useState<initConfig>(mp4Config)

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
