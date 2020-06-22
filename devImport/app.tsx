
import React, {useState} from 'react';
import { hot } from "react-hot-loader/root";

import VideoPlayer from '../src/index';

import {initConfig} from '../src/interfaces';



const mp4Config: initConfig = {
  type: 'mp4',
  hideRefresh: true,
  multiple: {
    list: [{text:'1x', value:1}, {text: '高清', value: 2}],
    initIndex: 1
  },
  poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591699097501&di=1f2f4942197f230c198c5fc8eeb6603a&imgtype=0&src=http%3A%2F%2Fwww.sinaimg.cn%2Fgm%2Fcr%2F2014%2F0611%2F3311791356.png',
  autoplay: false,
  isMobile: true,
  duration: 549185,
  src:
    "http://precdn.xylink.com/vodfiles/sharefiles/pre/live/2c9223e5715980cb01715d808f930146/20204/ffe193d4-452d-4045-8d2b-b0cb98c11e27.mp4",
}

const mp4Config2: initConfig = {
  type: 'mp4',
  hideRefresh: false,
  multiple: {
    list: [{text:'1x', value:1}, {text: '高清', value: 2}],
    initIndex: 1
  },
  poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591699097501&di=1f2f4942197f230c198c5fc8eeb6603a&imgtype=0&src=http%3A%2F%2Fwww.sinaimg.cn%2Fgm%2Fcr%2F2014%2F0611%2F3311791356.png',
  autoplay: false,
  isMobile: true,
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
        src: "http://prdsecurelive.ainemo.com/prdnemo/2c949a2971ada78c0171f2563f835f35.m3u8?auth_key=c44f5608a056a65bac59fe6e31881f64-1589004009-d9c36ee5a34a44018cc0204f70dcf370-",
        text: "小鱼1",
      },
      {
        src: "http://prdsecurelive.ainemo.com/prdnemo/2c949a2971ada78c0171f2563f835f35.m3u8?auth_key=c44f5608a056a65bac59fe6e31881f64-1589004009-d9c36ee5a34a44018cc0204f70dcf370-",
        text: "小鱼2"
      }
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
