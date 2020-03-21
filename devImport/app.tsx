
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
        src:' http://presecurelive.ainemo.com/testdevnemo/ff80808170e6aa1b0170f16824580134_2.flv?auth_key=804dfa8e091c176bea90ad53a628f191-1584693017-ef09d54fe76445aba3699ca7735ee4ed-',
        text: '标清',
      },
      {
        src:
          'http://presecurelive.ainemo.com/testdevnemo/ff80808170e6aa1b0170f16824580134.flv?auth_key=af94cd43cebede7d692cac1e367c4c5e-1584693017-8f25a3de6e874e0eb30784bd08da15b4-',
        text: '高清',
      },
    ],
    playIndex: 1,
  },
}


const hlsConfig: initConfig = {
  type: 'hls',
  option: {
    multiStreams: [
      {
        src: "http://txdirect.hls.huya.com/huyalive/1351873504-1351873504-5806252488008925184-2885343058-10057-A-0-1_2500.m3u8?wsSecret=58cbcdd42ef0c3faf0a5de5af11f5b94&wsTime=5e75b7ec",
        text: "标清",
      },
      {
        src: "http://txdirect.hls.huya.com/huyalive/1351873504-1351873504-5806252488008925184-2885343058-10057-A-0-1_2500.m3u8?wsSecret=58cbcdd42ef0c3faf0a5de5af11f5b94&wsTime=5e75b7ec",
        text: "高清"
      },
    ],
    playIndex: 1,
  },
}




const App = () => {
  const [option, setOption] = useState<initConfig>(hlsConfig)

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
