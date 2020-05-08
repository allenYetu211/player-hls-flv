
import React, {useState} from 'react';
import { hot } from "react-hot-loader/root";

import VideoPlayer from '../src/index';

import {initConfig} from '../src/interfaces';


const mp4Config: initConfig = {
  type: 'mp4',
  multiple: {
    list: [{text:'1x', value:1}, {text: '高清', value: 2}],
    initIndex: 1
  },
  autoplay: false,
  isMobile: false,
  src:
    "http://precdn.xylink.com/vodfiles/sharefiles/pre/live/2c9223e5715980cb01715d808f930146/20204/ffe193d4-452d-4045-8d2b-b0cb98c11e27.mp4",
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




const App = () => {
  const [option, setOption] = useState<initConfig>(hlsConfig)

  const choseFlv = () => {
    setOption(flvConfig);
  }
  const choseHLS = () => {
    setOption(hlsConfig);
  }

  const choseMp4Url2 = () => {
    setOption(mp4Config)
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
