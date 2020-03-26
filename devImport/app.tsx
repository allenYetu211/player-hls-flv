
import React, {useState} from 'react';
import { hot } from "react-hot-loader/root";

import VideoPlayer from '../src/index';

import {initConfig} from '../src/interfaces';


const mp4Config: initConfig = {
  type: 'mp4',
  autoplay: false,
  isMobile: true,
  src:
    "https://txcd-res.xylinkedu.com/vodfiles/sharefiles/vod/426770098917736448.mp4",
}

const flvConfig: initConfig = {
  type: 'flv',
  autoplay: false,
  isMobile: true,
  option: {
    multiStreams: [
      {
        src:'https://presecurelive.ainemo.com/testdevnemo/ff80808171055d06017115118a3f00f9.flv?auth_key=4a6adf85dbfba7ee600697d23852f306-1585294200-8d5471e45ff04f0ba51bafaf4bd1795c-',
        text: '标清',
      },
      {
        src:
          'https://presecurelive.ainemo.com/testdevnemo/ff80808171055d06017115118a3f00f9.flv?auth_key=807b24c62509fed62fb4b03ded627edb-1585294200-2ef68a65ffe242f488547fcf07e784cb-',
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
  hideMultiCode: true,
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
        src: "https://presecurelive.ainemo.com/testdevnemo/ff80808171055d06017115118a3f00f9.m3u8?auth_key=a7b8269425f461cad73c9f42bc66e254-1585294200-17f9077c8cec480bb9ea00a171515d4c-",
        text: "小鱼"
      },{
        src: "http://hls1a.douyucdn.cn/live/701979rFO9vpm2c5/playlist.m3u8?wsSecret=e5ef3f9091ad9a612e4551638447190d&wsTime=1584971530&token=h5-douyu-0-701979-1b7143ca2f7bc76bb85ca52567fda26b&did=fce1d799721df9283db8630200091531&origin=all&vhost=play2",
        text: "斗鱼"
      },
    ],
    playIndex: 2,
  },
}




const App = () => {
  const [option, setOption] = useState<initConfig>(flvConfig)

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
