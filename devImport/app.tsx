

// 兼容IE9-11版本
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
// Promise not defined

import "core-js/stable";
import "regenerator-runtime/runtime";

import React, { useState } from 'react';
import { hot } from "react-hot-loader/root";

import VideoPlayer from '../src/index';

import TestStore from './testStore';

// import { initConfig } from '../src/interfaces';

import { initConfig } from '../src/index';

import faker from 'faker';

// import detailsPiscture from './212621588.jpg@.webp';
// https://i0.hdslb.com/bfs/videoshot/212621588.jpg@.webp


const tm: initConfig = { "src": "https://predc2vod.xiaoyuonline.com/vodfiles/downloadfiles/shareLink/9828f93a-8c75-41c6-b6bc-47a2ec64ed73.mp4?auth_key=J_9h7WzpFAnGJeoCfhwTKg&expire=1610015465", "type": "mp4" }


const mp4z = {
  "type": "mp4",
  "src": "https://gxtestqa-res.xylinkedu.com/video/20201202/518802067800723456.mp4?auth_key=1611304333-21-1-96381b9d7203d210ad78d76d4d436943",
  "autoplay": true,
  "isMobile": false,
  "hideMultiCode": true,
  "multiple": {
    "list":
      [{ "text": "2x", "value": 2 }, { "text": "1.5x", "value": 1.5 }, { "text": "1.25x", "value": 1.25 }, { "text": "1x", "value": 1 }, { "text": "0.5x", "value": 0.5 }],
    "initIndex": 3
  }
}

const mp4C = {
  src: "http://prevoddownload.xylink.com/vodfiles/downloadfiles/shareLink/ed21d157-3761-4121-9a53-e32137f14699.mp4?auth_key=1610952382-0-0-911c459c7835b47768a002a61c2382f3",
  type: "mp4"
}

const mp4Config3: initConfig = {
  type: 'mp4',
  // hideRefresh: true,
  multiple: {
    list: [{ text: '001', value: 1 }, { text: '002', value: 2 }, { text: '003', value: 3 }],
    initIndex: 2
  },
  // hideMultiple: true,
  // hideProgressBar: true,
  // poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591699097501&di=1f2f4942197f230c198c5fc8eeb6603a&imgtype=0&src=http%3A%2F%2Fwww.sinaimg.cn%2Fgm%2Fcr%2F2014%2F0611%2F3311791356.png',
  autoplay: false,
  isMobile: false,
  duration: 54918500,
  thumbnail: {
    picture: 'https://testdevcdn.xylink.com/test-video/bimg.jpg',
    // width: 160,
    // height: 90,
    count: 12, // 图片总数
    backgroundSize: 3840, // 图片分辨率
  },
  src:
    "http://testqavoddownload.xylink.com/vodfiles/downloadfiles/shareLink/cf3f247f-18f9-4f91-abc9-bfe80e7da1a9.mp4?auth_key=1610710530-0-0-a31a1e14fd1d0715e4b12226e051d8e8",
}


const mp4Config2: initConfig = {
  type: 'mp4',
  // hideRefresh: false,
  multiple: {
    list: [{ text: '1xx', value: 1 }, { text: '2xx', value: 2 }],
    initIndex: 0
  },
  poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591699097501&di=1f2f4942197f230c198c5fc8eeb6603a&imgtype=0&src=http%3A%2F%2Fwww.sinaimg.cn%2Fgm%2Fcr%2F2014%2F0611%2F3311791356.png',
  autoplay: false,
  isMobile: false,

  src:
    "http://v-vodshare.v.ouchn.cn/vodfiles/sharefiles/live/9680d8af740741c301740a5706be08dc/202008/31140312/25cf0015-421b-48fe-b723-fb2ade2ae243.mp4",
}



const mp4Config: initConfig = {
  type: 'mp4',
  hideRefresh: true,
  multiple: {
    list: [{ text: '1x', value: 1 }, { text: '2x', value: 2 }],
    initIndex: 0
  },
  // poster: 'https://i0.hdslb.com/bfs/archive/54bd5adcf8505344fc0ae29422288db7e45af258.png@880w_388h_1c_95q',
  autoplay: false,
  isMobile: false,
  duration: 54918500,
  src:
    "http://testdevvoddownload.xylink.com/vodfiles/downloadfiles/shareLink/adf1ad66-1f0d-4e75-9092-fe18d2d884aa.mp4?auth_key=1603276313-0-0-90b9c5fc25a6204ed0a277fae7f483f7",
  thumbnail: {
    picture: '"http://testdevvoddownload.xylink.com/vodfiles/vodfiles/cloud/9005795481/101-bj2-txdevSig2-2157164404862_0_1602747891243_1920_1080_preview.jpg?auth_key=1603290713-0-0-c4431191c2f139503e88874b4d5ef939"',
    // width: 160,
    // height: 90,
    count: 12, // 图片总数
    backgroundSize: 3840, // 图片分辨率
  }
}




// vod 点播
const vodHlsConfig: initConfig = {
  poster: "http://testqacdn.xylink.com/poster/202105/16119087407093887.jpg",
  "type": "m3u8",
  "src": "http://testdevcdn.xylink.com/vodfiles/sharefiles/live/962891b17572fa6a017573ea1ff600c2/202103/26170334/a65e04a9-b92d-42e5-a990-d4b8f843a0f5.m3u8",
  // "src": "http://xy5.btjy.net:9990/vodfiles/sharefiles/202103/30184931/6e9cda93-6e6c-4548-89f3-23816b83b4c7.m3u8",
  "autoplay": false,
  "isMobile": false,
  "hideMultiCode": true,
  "multiple":
  {
    list: [
      { text: '0.5x', value: 0.5 },
      { text: '0.75x', value: 0.75 },
      { text: '1x', value: 1 },
      { text: '1.5x', value: 1.5 },
      { text: '2x', value: 2 },
    ],
    initIndex: 2,
  },
  "vod": true,
  // thumbnail: {
  //   picture: '"http://testdevvoddownload.xylink.com/vodfiles/vodfiles/cloud/9005795481/101-bj2-txdevSig2-2157164404862_0_1602747891243_1920_1080_preview.jpg?auth_key=1603290713-0-0-c4431191c2f139503e88874b4d5ef939"',
  //   // width: 160,
  //   // height: 90,
  //   count: 12, // 图片总数
  //   backgroundSize: 3840, // 图片分辨率
  // },
  contentPreview: {
    picture: "https://devcdn.xylink.com/test/dump_img.jpg",
    viewCount: 20,
    timestap: [90937, 124937, 196937, 294637, 394937, 494937, 394937, 494937, 594937, 694937, 794937, 894937, 2294937, 5890937]
  },
}

const vodHlsConfig2: initConfig = {
  // defaultBarrageState: false,
  videoBarrage: {
    // defaultBarrageState: false,
    // defaultBarrageState: false,
    // fontSize: 25,
    // tracksLine: 2,
    // trackSpacing: 80,
    // textSpacing: 20,
    // cacheData: 200

    fontSize: 20, // 字体大小
    defaultBarrageState: true,
    tracksLine: 3, // 弹幕轨道数
    trackSpacing: 30, // 轨道间距
    textSpacing: 20, // 弹幕间距
    cacheData: 5

  },
  "type": "m3u8",
  // "src": "http://testdevcdn.xylink.com/vodfiles/sharefiles/live/962891b17572fa6a017573ea1ff600c2/202103/26170334/a65e04a9-b92d-42e5-a990-d4b8f843a0f5.m3u8?v=2",
  // "src": "https://qahz-res.xylinkedu.com/vodfiles/sharefiles/vod/561143719001063424.m3u8?auth_key=1621586134-28-17-9578fc7ded6124d8537792dc519b3a5c&t=1621584214990",
  // "src": "http://prd-vodcdn.xylink.com/vodfiles/sharefiles/live/9680e1be766c4adb01766c591ac70027/202103/01154537/8dd9aaf3-a175-4d55-bedd-d78bcfbf3f0e.m3u8?t=1622770992789",
  "src": 'https://test-cdn.eduzhida.com/vodfiles/sharefiles/vod/609758260756480000.m3u8',
  "autoplay": false,
  "isMobile": false,
  "hideMultiCode": true,
  'timestampUnit': true,
  "multiple":
  {
    "list":
      [{ "text": "2x", "value": 2 },
      { "text": "1.5x", "value": 1.5 },
      { "text": "1.25x", "value": 1.25 },
      { "text": "1x", "value": 1 },
      { "text": "0.5x", "value": 0.5 }],
    "initIndex": 3
  },
  "vod": true,
  thumbnail: {
    picture: '"http://testdevvoddownload.xylink.com/vodfiles/vodfiles/cloud/9005795481/101-bj2-txdevSig2-2157164404862_0_1602747891243_1920_1080_preview.jpg?auth_key=1603290713-0-0-c4431191c2f139503e88874b4d5ef939"',
    // width: 160,
    // height: 90,
    count: 12, // 图片总数
    backgroundSize: 3840, // 图片分辨率
  },
  contentPreview: {
    picture: "https://devcdn.xylink.com/test/dump_img.jpg",
    viewCount: 20,
    timestap: [90937, 124937, 196937, 294637, 394937, 494937, 394937, 494937, 594937, 694937, 794937, 894937, 2294937, 5890937]
  },
  // antiScreenRecording: {
  //   text: '测试内容',
  //   color: '#fff',
  //   duration: 2000,
  //   interval: 3000,
  //   fontSize: 35
  // }
}

const flvConfig: initConfig = {
  type: 'flv',
  autoplay: false,
  isMobile: true,
  option: {
    multiStreams: [
      {
        src: 'http://prdpulllive.xylink.com/prdnemo/9680cebc796b73450179794af8530e57.flv?auth_key=a8ed83a7761372ef5197981d0b36e111-1621332004-357646ad72d448eea39ea00cd8bde223-',
        text: '标清',
      },
      {
        src:
          'http://prdpulllive.xylink.com/prdnemo/9680cebc796b73450179794af8530e57.flv?auth_key=a8ed83a7761372ef5197981d0b36e111-1621332004-357646ad72d448eea39ea00cd8bde223-',
        text: '高清',
      },
    ],
    playIndex: 1,
  },
}


const hlsConfig: initConfig = {
  type: 'hls',
  autoplay: false,
  isMobile: false,
  option: {
    multiStreams: [
      {
        src: "http://prdpulllive.xylink.com/prdnemo/9680cfb67be4da5d017c10c3d7f73da0.m3u8?auth_key=3669a7595f9c3beb99c436a7f5cc250d-1632463220-fe9aabd6e5b14fe897f9e34cf4a53cb4-",
        text: "小鱼1",
      },
      {
        src: "http://prdpulllive.xylink.com/prdnemo/9680cfb67be4da5d017c10c3d7f73da0_2.m3u8?auth_key=777213bd4adb19135a44c10f5caebd2f-1632463220-963f7ab995ff423bbb0de669a18ec859-",
        text: "小鱼2",
      }
    ],
    playIndex: 0,
  }
}

const hlsConfigSrc: initConfig = {
  type: 'hls',
  src:
    'https://live.ainemo.com/testdevnemo/ff80808171a4ff980171a7b9d6a20023.m3u8?auth_key=1587750600-0-0-9c8741e8888a406db25474818e1d81b5',
  autoplay: false,
  poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591699097501&di=1f2f4942197f230c198c5fc8eeb6603a&imgtype=0&src=http%3A%2F%2Fwww.sinaimg.cn%2Fgm%2Fcr%2F2014%2F0611%2F3311791356.png',
  isMobile: false,
  hideMultiCode: true,
  multiple: {
    list: [
      { text: '2x', value: 2 },
      { text: '1.5x', value: 1.5 },
      { text: '1x', value: 1 },
      { text: '0.5x', value: 0.5 },
    ],
    initIndex: 2,
  },
}

const dashConfig: initConfig = {
  type: 'dash',
  src: 'https://ainemo-vodcdn.oss-cn-beijing.aliyuncs.com/vodfiles/sharefiles/dash_single_file/training.mpd',
  isMobile: false,
  multiple: {
    list: [{ text: '1xx', value: 1 }, { text: '2xx', value: 2 }, { text: '3xx', value: 3 }],
    initIndex: 1
  },
  autoplay: false,
  vod: true,
}




const App = () => {
  // const [option, setOption] = useState<any>(vodHlsConfig)
  // const [option, setOption] = useState<any>(hlsConfig)
  const [option, setOption] = useState<any>(vodHlsConfig2)

  const choseFlv = () => {
    setOption(flvConfig);
  }
  const choseHLS = () => {
    setOption(vodHlsConfig2);
  }

  const choseMp4Url2 = () => {
    setOption(mp4Config2)
  }

  const onVideoPlayerState = (vp: any) => {
    console.log('vp', vp)
    let count = 0;

    // const msgs = [
    //   `config {url: '/live/watch/heartbeat/9628b0c07d50a5f0017d514317a40019?t=1637754878776', method: 'get', params: {…}, headers: {…}, baseURL: 'https://testqalive.xylink.com', …}`,
    //   `config {url: '/live/watch/heartbeat/9628b0c07d50a5f0017d514317a40019?t=1637754878776', method: 'get', params: {…}, headers: {…}, baseURL: 'https://testqalive.xylink.com', …}`,
    //   `config {url: '/live/watch/heartbeat/9628b0c07d50a5f0017d514317a40019?t=1637754878776', method: 'get', params: {…}, headers: {…}, baseURL: 'https://testqalive.xylink.com', …}`,
    //   `config {url: '/live/watch/heartbeat/9628b0c07d50a5f0017d514317a40019?t=1637754878776', method: 'get', params: {…}, headers: {…}, baseURL: 'https://testqalive.xylink.com', …}`,
    //   `config {url: '/live/watch/heartbeat/9628b0c07d50a5f0017d514317a40019?t=1637754878776', method: 'get', params: {…}, headers: {…}, baseURL: 'https://testqalive.xylink.com', …}`,
    //   `config {url: '/live/watch/heartbeat/9628b0c07d50a5f0017d514317a40019?t=1637754878776', method: 'get', params: {…}, headers: {…}, baseURL: 'https://testqalive.xylink.com', …}`,
    //   `config {url: '/live/watch/heartbeat/9628b0c07d50a5f0017d514317a40019?t=1637754878776', method: 'get', params: {…}, headers: {…}, baseURL: 'https://testqalive.xylink.com', …}`,
    //   `config {url: '/live/watch/heartbeat/9628b0c07d50a5f0017d514317a40019?t=1637754878776', method: 'get', params: {…}, headers: {…}, baseURL: 'https://testqalive.xylink.com', …}`,

    //   `SMG::::`,

    //   `2random contact card containing many properties 
    //   random contact card containing many properties random 
    //   contact card containing many properties random contact 
    //   card containing many properties random contact card containing
    //   many properties random contact card containing many properties
    //   random contact card containing many properties random contact 
    //   card containing many properties random contact 
    //   random contact card containing many properties
    //   random contact card containing many properties
    //   random contact card containing many properties
    //   random contact card containing many properties
    //   random contact card containing many properties
    //   random contact card containing many properties
    //   random contact card containing many properties
    //   card containing many properties random contact card containing many properties`,
    // ]


    const fakers = {
      a: () => `${faker.name.lastName()}，${faker.name.firstName()}}, ${faker.datatype.number}`,
      b: () => `${faker.company.catchPhraseAdjective()}`,
      c: () => `${faker.finance.currencyCode()}`,
    }
    /**
        *  场景一：
        *  每秒20条， 长句
        */

    const timInterval = setInterval(() => {
      count += 1;
      vp.mountFunction.barrage.push({
        // value: `${count} : config {url: '/live/watch/heartbeat/9628b0c07d50a5f0017d514317a40config `,
        // value: `${count} ：今天就是感恩节了，有个好消息告诉你今天就是感恩节了，有个好消息告诉你今天就是感恩节了，有个好消息告诉你！`,
        value: `${count}: ${faker.name.lastName()}`,
        speed: 2,
      })
    }, 50);



    /**
      *  场景二：
      *  添加5条后 ，停止推送20秒后继续添加弹幕出现。
      */
    // function setTimeInterval() {
    //   console.log('setTimeInterval>>>>>>')
    //   const timInterval = setInterval(() => {
    //     count += 1;
    //     vp.mountFunction.barrage.push({
    //       value: `${count} ：今天就是感恩节了，有个好消息告诉你！`,
    //       speed: 2,
    //     });
    //     if (count > 5) {
    //       clearInterval(timInterval);
    //       setTimeout(() => {
    //         console.log('setTimeInterval')
    //         setTimeInterval()
    //         count = 0;
    //       }, 10000)
    //     }
    //   }, 50);
    // };

    // setTimeInterval();




    // setTimeout(() => {
    //   vp.mountFunction.barrage.clean()
    // }, 2000)

    // setTimeout(() => {
    //   vp.mountFunction.barrage.open()
    // }, 4000)

    vp.mountFunction.barrage.start();

    // setTimeout(() => {
    //   vp.mountFunction.onChangePlayIndex(1)
    // }, 3000)
    // console.log('vp', vp.destroy);

    // console.log('vp==>>>>', vp.videoEl.playbackRate = 1)
  }

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    }}>
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


      <div style={{
        position: 'absolute',
        top: '0px',
        left: '100px',
        zIndex: 9999,
        color: '#fff'
      }}>
        <TestStore />
      </div>

      <button style={{
        position: 'absolute',
        top: '0px',
        left: '150px',
        zIndex: 9999
      }} onClick={choseHLS}>HLS</button>

      {/* <div style={{width: '200px', height: "100vh", position: "relative"}}> */}
      <VideoPlayer {...option} onVideoPlayerState={onVideoPlayerState} />
      {/* </div> */}

    </div>
  )

}

export default hot(App);
