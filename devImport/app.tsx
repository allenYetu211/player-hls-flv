
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
        src:'http://prdsecurelive.ainemo.com/prdnemo/2c94971170ee30f40171291b0cb86de6.flv?auth_key=c0019c95f14aa5a0a522994d19b44cf0-1585627249-6fc97f05b1b34c5d984bdace727d949e-',
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
  isMobile: false,
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
        src: "http://prdsecurelive.ainemo.com/prdnemo/2c94971170ee30f40171291b0cb86de6.m3u8?auth_key=e2dd8389ad434afd9902f58f731176b1-1585627249-d1de4d761efa474aa1cf25cba6c30351-",
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
