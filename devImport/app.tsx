
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
        src:'http://prdsecurelive.ainemo.com/prdnemo/2c949a2a707cfb12017089d7a2633b83_2.flv?auth_key=8d4bc759cd3bb6c96b671347a65c46af-1583559000-e3d43bb3e6244c12b34ae393a1653be9-',
        text: '标清',
      },
      {
        src:
          'http://prdsecurelive.ainemo.com/prdnemo/2c949a2a707cfb12017089d7a2633b83.flv?auth_key=66e0400aaaeee5c914d6b3d853f88117-1583559000-747da1c53d2d438f875d1f5002ac570e-',
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
