
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
  isMobile: true,
  autoplay: false,
  option: {
    multiStreams: [
      {
        src: "http://presecurelive.ainemo.com/testdevnemo/ff80808171055acb017108421633008e.m3u8?auth_key=2fe1e23ed866167348664a3eec29df4f-1585076458-43c1d9450a524341aa9ab1b813eca212-",
        text: "虎牙",
      },{
        src: "http://presecurelive.ainemo.com/testdevnemo/ff80808171055acb017108421633008e_2.m3u8?auth_key=24e72f3bbaef57e905e2774e4f37ca4e-1585076458-294a2d38958b4833bfc7870dd7666ed5-",
        text: "bilibili",
      },
      {
        src: "http://presecurelive.ainemo.com/testdevnemo/ff80808171055acb017107b68a13006a_2.m3u8?auth_key=721708bbb8d6b3af9a7537d9589deacf-1585067429-87ed686e4a2f4ddb96b7943fbd7565e7-",
        text: "小鱼"
      },{
        src: "http://hls1a.douyucdn.cn/live/701979rFO9vpm2c5/playlist.m3u8?wsSecret=e5ef3f9091ad9a612e4551638447190d&wsTime=1584971530&token=h5-douyu-0-701979-1b7143ca2f7bc76bb85ca52567fda26b&did=fce1d799721df9283db8630200091531&origin=all&vhost=play2",
        text: "斗鱼"
      },
    ],
    playIndex: 0,
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
