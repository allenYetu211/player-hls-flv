
import React, {useState} from 'react';
import { hot } from "react-hot-loader/root";

import VideoPlayer from '../src/index';

import {initConfig} from '../src/interfaces';


const mp4Config: initConfig = {
  type: 'mp4',
  autoplay: false,
  isMobile: true,
  src:
    "http://testdevcdn.xylink.com/vodfiles/sharefiles/live/ff8080817116b00001711ad5472300b6/20203/7de7712d-abb5-4aa6-9995-30a0dcaf5e76.mp4",
}

const flvConfig: initConfig = {
  type: 'flv',
  autoplay: false,
  isMobile: true,
  option: {
    multiStreams: [
      {
        src:'http://prdsecurelive.ainemo.com/prdnemo/2c924e4970ee3006017129be5bc917a7.flv?auth_key=dd5be82b04c943062ad661a4a1948425-1585638011-c4ec0a8271a74c32b79fd522a341c219-',
        text: '标清',
      },
      {
        src:
          'http://prdsecurelive.ainemo.com/prdnemo/2c924e4970ee3006017129be5bc917a7.flv?auth_key=dd5be82b04c943062ad661a4a1948425-1585638011-c4ec0a8271a74c32b79fd522a341c219-',
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
        src: "http://prdsecurelive.ainemo.com/prdnemo/2c924e4970ee3006017129be5bc917a7.m3u8?auth_key=6d8f868686f7b5f417bd8882f96752dc-1585638011-14ec76371e7f4af0a787d1980e22554b-",
        text: "小鱼1",
      },
      {
        src: "http://prdsecurelive.ainemo.com/prdnemo/2c924e4970ee3006017129be5bc917a7.m3u8?auth_key=6d8f868686f7b5f417bd8882f96752dc-1585638011-14ec76371e7f4af0a787d1980e22554b-",
        text: "小鱼2"
      }
    ],
    playIndex: 0,
  },
}




const App = () => {
  const [option, setOption] = useState<initConfig>(mp4Config)

  const choseMp4Url = () => {
    setOption({
      type: 'mp4',
      autoplay: false,
      isMobile: true,
      src:
        "http://testdevcdn.xylink.com/vodfiles/sharefiles/live/ff80808170e6aa1b0170e751d2a2000a/20203/9d3a1691-90eb-43dc-b824-a0d9c4b8b04c.mp4",
    })
  }

  return (
    <div>
      <button style={{
        position: 'absolute',
        top: '0px',
        left: '0px',
        zIndex: 999
      }} onClick={choseMp4Url}>切换</button>
      <VideoPlayer {...option} />
    </div>
  )
 
}

export default hot(App);
