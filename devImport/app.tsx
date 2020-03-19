
import React, {useState} from 'react';
import { hot } from "react-hot-loader/root";

import VideoPlayer from '../src/index';

import {initConfig} from '../src/interfaces';


const mp4Config: initConfig = {
  type: 'mp4',
  autoplay: false,
  isMobile: true,
  src:
    "http://testdevcdn.xylink.com/vodfiles/sharefiles/live/ff80808170e6aa1b0170e751d2a2000a/20203/1796783e-624a-4cc3-babe-1cf6a1eb3272.mp4",
}

const flvConfig: initConfig = {
  type: 'flv',
  autoplay: false,
  isMobile: true,
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
        src:'http://prdsecurelive.ainemo.com/prdnemo/2c94982b70ab389e0170e868b366534c_2.m3u8?auth_key=ed7f1579407b592078ce1e157c467a90-1585146600-8ec46633d26f4091987e62a4183c7a7f-',
        text: '标清',
      },
      {
        src:
          'http://prdsecurelive.ainemo.com/prdnemo/2c94982b70ab389e0170e868b366534c_2.m3u8?auth_key=ed7f1579407b592078ce1e157c467a90-1585146600-8ec46633d26f4091987e62a4183c7a7f-',
        text: '高清',
      },
    ],
    playIndex: 1,
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
