/*
 * @Author: Allen OYang
 * @Date: 2022-01-13 19:04:18
 * @LastEditTime: 2022-02-15 11:49:21
 */


// 兼容IE9-11版本
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
// Promise not defined

import "core-js/stable";
import "regenerator-runtime/runtime";

import React, { useState } from 'react';
import { hot } from "react-hot-loader/root";
import VideoPlayer from '../src/index';
import { HlsVodConfigMultiStreams, HlsConfigSrc, HlsLiveConfig, HlsConfigSrcBarrage, HlsVodConfigSrc } from './configOption/hls';
import { Mp4Config, Mp4ConfigBasic, Mp4ConfigThumbnail } from './configOption/mp4';
import { FlvConfig } from './configOption/flv';
import { DashConfig } from './configOption/dash';


const App = () => {
  const [option, setOption] = useState<any>(FlvConfig)


  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    }}>
      <VideoPlayer {...option}
      // onVideoPlayerState={onVideoPlayerState} 
      />
    </div>
  )

}

export default hot(App);
