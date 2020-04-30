
import React, {useState} from 'react';
import { hot } from "react-hot-loader/root";

import VideoPlayer from '../src/index';

import {initConfig} from '../src/interfaces';


const mp4Config: initConfig = {
  type: 'mp4',
  multiple: {
    list: [{text:'1x', value:1}, {text: '2x', value: 2}],
    initIndex: 1
  },
  autoplay: false,
  isMobile: false,
  src:
    "http://precdn.xylink.com/vodfiles/sharefiles/pre/live/2c9223e5715980cb01715d808f930146/20204/ffe193d4-452d-4045-8d2b-b0cb98c11e27.mp4",
}

const flvConfig: initConfig = {
  type: 'flv',
  autoplay: false,
  isMobile: true,
  option: {
    multiStreams: [
      {
        src:'http://presecurelive.ainemo.com/prenemo/2c9223e57163d82d0171730eb83a0fdc.flv?auth_key=890a80fc8166c58d3f4a66111dd97f43-1586953800-db608cb20abd4763be6972f6cdd4dedb-',
        text: '标清',
      },
      {
        src:
          'http://presecurelive.ainemo.com/prenemo/2c9223e57163d82d0171730eb83a0fdc.flv?auth_key=890a80fc8166c58d3f4a66111dd97f43-1586953800-db608cb20abd4763be6972f6cdd4dedb-',
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
  option: {
    multiStreams: [
      {
        src: "http://presecurelive.ainemo.com/prenemo/2c9226fc715ee2cb017162bd38dd0049.m3u8?auth_key=315d229298d39b479bbbd0433d9a45f2-1586593817-f658be2b8cf7410b92fb542a0f1c59b9-",
        text: "小鱼1",
      },
      {
        src: "http://prdsecurelive.ainemo.com/prdnemo/2c94982b71364816017138fef97219cc.m3u8?auth_key=64337803c7e77086385e227a2a7c09e9-1585893604-81d776115f3f457ca085a6cb304179e7-",
        text: "小鱼2"
      }
    ],
    playIndex: 0,
  },
}




const App = () => {
  const [option, setOption] = useState<initConfig>(mp4Config)

  const choseFlv = () => {
    setOption(flvConfig);
  }
  const choseHLS = () => {
    setOption(hlsConfig);
  }

  const choseMp4Url2 = () => {
    setOption(mp4Config)
  }

  const onVideoPlayerState = (vp: any) => {
    console.log('vp', vp);
  }

  return (
    <div>
      <button style={{
        position: 'absolute',
        top: '0px',
        left: '0px',
        zIndex: 9999
      }} onClick={choseFlv}>flv</button>

<button style={{
        position: 'absolute',
        top: '0px',
        left: '100px',
        zIndex: 9999
      }} onClick={choseMp4Url2}>MP4</button>


<button style={{
        position: 'absolute',
        top: '0px',
        left: '150px',
        zIndex: 9999
      }} onClick={choseHLS}>HLS</button>
      <VideoPlayer {...option} onVideoPlayerState={onVideoPlayerState}/>
    </div>
  )
 
}

export default hot(App);
