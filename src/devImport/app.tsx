
import React, {useState} from 'react';
import { hot } from "react-hot-loader/root";

import VideoPlayer from '../index';

import {initConfig} from '@interfaces/vp';



const App = () => {

  const [option] = useState<initConfig>({
    type: 'mp4',
    autoplay: false,
    src:
      'http://1.180.60.49:9990/vodfiles/sharefiles/live/2c924e496fb46e43016fb62acb0813f9/20201/316cead6-033b-4a2b-95f1-65da69d4b312.mp4',
  })

  return <VideoPlayer {...option} />
}

export default hot(App);
