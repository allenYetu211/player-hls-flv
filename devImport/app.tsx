
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
        src:'https://d1--cn-gotcha04.bilivideo.com/live-bvc/734551/live_30109585_1857875.flv?cdn=cn-gotcha04&expires=1584376686&len=0&oi=1929209288&pt=web&qn=10000&trid=8c653f1072064030828e5788a624fea6&sigparams=cdn,expires,len,oi,pt,qn,trid&sign=490a34bf62b28ffea4deef76dc53c655&ptype=0&platform=web&pSession=T0BkkYFY-MyHh-4Y5Q-h263-pK2nBECw425Z',
        text: '标清',
      },
      {
        src:
          'https://d1--cn-gotcha04.bilivideo.com/live-bvc/734551/live_30109585_1857875.flv?cdn=cn-gotcha04&expires=1584376686&len=0&oi=1929209288&pt=web&qn=10000&trid=8c653f1072064030828e5788a624fea6&sigparams=cdn,expires,len,oi,pt,qn,trid&sign=490a34bf62b28ffea4deef76dc53c655&ptype=0&platform=web&pSession=T0BkkYFY-MyHh-4Y5Q-h263-pK2nBECw425Z',
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
  const [option] = useState<initConfig>(hlsConfig)
  return <VideoPlayer {...option} />
}

export default hot(App);
