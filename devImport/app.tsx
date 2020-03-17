
import React, {useState} from 'react';
import { hot } from "react-hot-loader/root";

import VideoPlayer from '../src/index';

import {initConfig} from '../src/interfaces';


const mp4Config: initConfig = {
  type: 'mp4',
  autoplay: false,
  src:
    "http://prd-vodcdn.xylink.com/vodfiles/sharefiles/live/2c94bb04707cfec4017089d77d353acc/20203/1a690410-bc08-4258-af58-14f77a462f9b.mp4",
}

const flvConfig: initConfig = {
  type: 'flv',
  autoplay: false,
  option: {
    multiStreams: [
      {
        src:' http://presecurelive.ainemo.com/testdevnemo/ff80808170e15e9b0170e667b6fe00e5_2.flv?auth_key=6e59d49550c6ac7e3c128f5875da1447-1584507658-d939b40c59cb4fb08c890a6f3e437112-',
        text: '标清',
      },
      {
        src:
          ' http://presecurelive.ainemo.com/testdevnemo/ff80808170e15e9b0170e667b6fe00e5_2.flv?auth_key=6e59d49550c6ac7e3c128f5875da1447-1584507658-d939b40c59cb4fb08c890a6f3e437112-',
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
        src:'https://d1--cn-gotcha104.bilivideo.com/live-bvc/437609/live_30109585_1857875.m3u8?cdn=cn-gotcha04&expires=1584377940&len=0&oi=1929209288&pt=h5&qn=10000&trid=2256fd0504694630bf30ee6a8530187a&sigparams=cdn,expires,len,oi,pt,qn,trid&sign=970f3104383348e8e6c15d68d04ba229&ptype=0',
        text: '标清',
      },
      {
        src:
          'https://d1--cn-gotcha104.bilivideo.com/live-bvc/437609/live_30109585_1857875.m3u8?cdn=cn-gotcha04&expires=1584377940&len=0&oi=1929209288&pt=h5&qn=10000&trid=2256fd0504694630bf30ee6a8530187a&sigparams=cdn,expires,len,oi,pt,qn,trid&sign=970f3104383348e8e6c15d68d04ba229&ptype=0',
        text: '高清',
      },
    ],
    playIndex: 1,
  },
}



const App = () => {
  const [option] = useState<initConfig>(flvConfig)
  return <VideoPlayer {...option} />
}

export default hot(App);
