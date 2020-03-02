
import React, {useState} from 'react';
import { hot } from "react-hot-loader/root";

import VideoPlayer from '../src/index';

import {initConfig} from '../src/interfaces';


const mp4Config: initConfig = {
  type: 'mp4',
  autoplay: false,
  src:
    'http://1.180.60.49:9990/vodfiles/sharefiles/live/2c924e496fb46e43016fb62acb0813f9/20201/316cead6-033b-4a2b-95f1-65da69d4b312.mp4',
}

const flvConfig: initConfig = {
  type: 'flv',
  autoplay: false,
  option: {
    multiStreams: [
      {
        src:'http://prdsecurelive.ainemo.com/prdnemo/2c94bb04707cfec4017089d77d353acc.flv?auth_key=ac2584d8bafac786c1ee7d1d959a3b33-1583299800-f50144a0eecd4efa89bec92c75d0aacc-',
        text: '标清',
      },
      {
        src:
          'http://prdsecurelive.ainemo.com/prdnemo/2c94bb04707cfec4017089d77d353acc.flv?auth_key=ac2584d8bafac786c1ee7d1d959a3b33-1583299800-f50144a0eecd4efa89bec92c75d0aacc-',
        text: '高清',
      },
    ],
    playIndex: 1,
  },
}


const hlsConfig: initConfig = {
  type: 'hls',
  autoplay: false,
  option: {
    multiStreams: [
      {
        src:'tp://prdsecurelive.ainemo.com/prdnemo/2c94bb04707cfec4017089d77d353acc_2.m3u8?auth_key=9525bed7443122e451f0cdee079c1aaa-1583299800-f112f0e537f14ff38f36fe268e0e974a-',
        text: '标清',
      },
      {
        src:
          'http://prdsecurelive.ainemo.com/prdnemo/2c94bb04707cfec4017089d77d353acc.m3u8?auth_key=4dd4c84c77d4efc784cc60731645ee3c-1583299800-941b991626074f9f841c8253d0c73f30-',
        text: '高清',
      },
    ],
    playIndex: 1,
  },
}



const App = () => {
  const [option] = useState<initConfig>(hlsConfig)
  return <VideoPlayer {...option} />
}

export default hot(App);
