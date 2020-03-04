
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
        src:'http://prdsecurelive.ainemo.com/prdnemo/2c949a2a707cfb12017089d7a2633b83.flv?auth_key=497dc1edca0a091e7749f7a4b7c7759b-1583559000-f46e3eb1d57a4a83a774f186b14736b2-',
        text: '标清',
      },
      {
        src:
          'http://prdsecurelive.ainemo.com/prdnemo/2c949a2a707cfb12017089d7a2633b83.flv?auth_key=497dc1edca0a091e7749f7a4b7c7759b-1583559000-f46e3eb1d57a4a83a774f186b14736b2-',
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
        src:'http://prdsecurelive.ainemo.com/prdnemo/2c949a2a707cfb12017089d7a2633b83_2.m3u8?auth_key=87d9480b42428ced637a8954d9aad39d-1583559000-902995052d9f4ed69212d42e9acd17ad-',
        text: '标清',
      },
      {
        src:
          'http://prdsecurelive.ainemo.com/prdnemo/2c949a2a707cfb12017089d7a2633b83_2.m3u8?auth_key=87d9480b42428ced637a8954d9aad39d-1583559000-902995052d9f4ed69212d42e9acd17ad-',
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
