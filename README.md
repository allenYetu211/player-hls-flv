# v-player

## 浏览器

- Windows 10 - IE11
- IE 以外所有浏览器
- 移动端播放器

---

## 功能

- [x] 分辨率切换
- [x] 倍速选择
- [x] mp4
- [x] flv
- [x] hls 直播
- [x] hls 点播
- [x] dash 点播
- [x] 导播图
- [x] 预览图

---

### 使用

> 安装

```
npm i player-hls-flv
```

> 初始参数

```typescript
export interface initConfig {
  type?: 'flv' | 'hls' | 'mp4' | 'm3u8' | 'dash';
  src?: string;
  autoplay?: boolean;
  option?: IMultiStreamsContainer;
  isMobile?: boolean;
  hideControl?: boolean;
  hideMultiCode?: boolean;
  hideRefresh?: boolean;
  multiple?: IMultiple;
  vod?: boolean;
  poster?: string;
  duration?: string;
}

export interface IMultiple {
  list: {
    text: string;
    value: number;
  }[];
  initIndex: number;
}

export interface IMultiStreams {
  src: string;
  text: string;
}

export interface IMultiStreamsContainer {
  multiStreams: IMultiStreams[];
  playIndex: number;
}
```

> 实际引用

```react
import PlayerHlsFlv from 'player-hls-flv';

return (
  <PlayerHlsFlv {...params} />
)
```

---

<!-- ## 效果图
![image](https://raw.githubusercontent.com/allenYetu211/player-hls-flv/master/picture/picture-1.png)
![image](https://raw.githubusercontent.com/allenYetu211/player-hls-flv/master/picture/picture-2.png)
![image](https://raw.githubusercontent.com/allenYetu211/player-hls-flv/master/picture/picture-3.png)
![image](https://raw.githubusercontent.com/allenYetu211/player-hls-flv/master/picture/picture-4.png) -->

---

## Error Code

| 错误码          | 描述                                   |
| --------------- | -------------------------------------- |
| 0001            | 浏览器禁止自动播放，需手动处理播放状态 |
| NETWORK_ERROR   | 网络相关错误                           |
| STATISTICS_INFO | 提供播放统计信息，如下降帧，当前速度等 |
| ERROR           | 播放过程中发生的任何错误               |
| MEDIA_ERROR     | 与媒体相关的错误(格式错误、解码问题等) |
| OTHER_ERROR     | 任何其他未指定的错误                   |

## 参数

| 参数                                        | 参数类型                                                                | 默认值                      | 描述                                         |
| ------------------------------------------- | ----------------------------------------------------------------------- | --------------------------- | -------------------------------------------- |
| type                                        | 'flv' ，'hls'，'mp4'，'m3u8'                                            | ''                          | 媒体类型                                     |
| src?                                        | string                                                                  | ''                          | 请求地址                                     |
| autoplay?                                   | boolean                                                                 | ''                          | 自动播放                                     |
| option?                                     | IMultiStreamsContainer                                                  | ''                          | 分辨率选项                                   |
| isMobile?                                   | boolean                                                                 | false                       | 手机端                                       |
| hideMultiCode?                              | boolean                                                                 | false                       | 是否影藏分辨率                               |
| hideRefresh?                                | boolean                                                                 | false                       | 是否影藏刷新按钮                             |
| hideMultiple?                               | boolean                                                                 | false                       | 隐藏倍数                                     |
| hideProgressBar?                            | boolean                                                                 | false                       | 隐藏进度条                                   |
| onVideoPlayerState?                         | (vp) => void;                                                           | ''                          | 播放器注册成功后，通过回调返回播放器相关属性 |
| multiple                                    | [{text: '1x',value: 1,},{text: '2x',value: 2,},{text: '3x',value: 3,},] | 倍速                        |
| poster?                                     | string                                                                  | 背景图                      |
| duration?                                   | string                                                                  | 视频总时长，单位：毫秒      |
| hideControl?                                | boolean                                                                 | 隐藏控制栏                  |
| vod?                                        | boolean                                                                 | 视频类型为 hls 点播需要设置 |
| contentPreview:{picture,viewCount,timestap} | {picture:string,viewCount:number,timestap:number[]}                     | timestap 毫秒               |

```js
 thumbnail: {
    picture: 'https://testdevcdn.xylink.com/test-video/20min-1.jpg',   // 图片地址
    count: 301,  // 图片总数

    backgroundSize: 3840, // 图片分辨率（固定写成  3840）
  }
```

```typescript
<!-- vp返回关键属性 -->
{
  containerEl: '当前使用播放器的容器div元素',
  videoEl: 'video 元素',
  play: '控制播放器开始播放',
  stop: '控制播放器停止播放',
  on: '监听当前播放器返回状态, 可以监听的对象有 「0001」「duration」「fullscreen」「mediaState」「play」「stop」「refresh」',
}
```

- 跑马灯、弹幕： 注入 onVideoPlayerState 回调方法。

```typescript

videoBarrage: boolean;

// 通过回调的vp方法获取
// 通过 mountFunction.barrage.push 添加弹幕。
// mountFunction.barrage.start 其实启动。


const onVideoPlayerState = (vp: any) => {
    let count = 0;
    setInterval(() => {
      count += 1;
      vp.mountFunction.barrage.push({
        value: `${count}：`,   // 弹幕内容 string
        viewableArea: 240,     // 弹幕区域可视区域：number ，不填写默认视频区域全屏
        speed: 2,               // 弹幕速度： number
        color: '#20ff29',        // 颜色 16进制: string, 不填写， 则显示随机颜色。
      })
    }, 100);
    vp.mountFunction.barrage.start();


vp.mountFunction.barrage.start  // 开始发送弹幕
vp.mountFunction.barrage.push   // 添加弹幕
vp.mountFunction.barrage.clean  // 清除弹幕，并关闭弹幕功能
vp.mountFunction.barrage.open   // 开启弹幕功能

```

- 防录屏

```javascript

antiScreenRecording: {
  text: string;
  color: string;
  duration: number;   // 字幕存活时间（单位 毫秒）   默认存活 5秒钟
  interval: number;   // 字幕出现间隔（单位 毫秒）   默认出现频率 1分钟
  fontSize?: number;  // 十六进制
  locationX?: string | number;
  locationY?: string | number;
}
```

---

# 本地开发准备

### 环境依赖：

```
node ：10.0+
```

### 安装启动

```
yarn install
```

### 本地运行

```
集成开发测试：yarn start  // 占用3000端口
组件开发测试：yarn storybook  // 占用8000端口
```

### 访问地址：

```
localhost:3000
```

### 打包

```
yarn build
```

### 目录结构：

```
├── README.md
├── babel.config.js
├── devImport  // 开发测试集成入口
│   ├── app.tsx  // 开发测试集成入口， 在此文件模拟第三方应用调用。
│   └── index.tsx
├── dist // 编译后的文件
├── index.html
├── jest.config.js
├── jest.setup.js
├── package-lock.json
├── package.json
├── picture
├── postcss.config.js
├── react-app-env.d.ts
├── src
│   ├── asset
│   ├── basicComponent // 抽离的公用组件，可以单独发布npm
│   ├── component // 组件内容
│   ├── dash-shaka // 测试内容，
│   ├── hooks
│   ├── images
│   ├── index.tsx  // 入口文件
│   ├── interfaces // 内容定义
│   ├── player //播放器实现
│   ├── react-app-env.d.ts
│   ├── stories // storybooks 测试内容
│   ├── styles.scss
│   ├── uiCompoent // 二次ui开发
│   ├── ur-util
│   └── utils // 工具库
├── test
│   ├── Link.react.js
│   ├── Link.react.test.js
│   ├── __snapshots__
│   └── index.test1.js
├── tsconfig.extends.json
├── tsconfig.json
├── util
│   └── replaceLoader.js
├── webpack.config.js
├── webpackAddVersionPulgin.js  // 编译打包的版本自动生成webpack 插件， 可以单独提出npm包
├── yarn-error.log
```

### 版本更新内容：

#### 1.5.32 (2021-08-18)

1. 添加随即字幕（防录屏）

#### 1.5.26 (2021-07-27)

1. 添加弹幕功能。

#### 1.5.21（2021-05-13）

1. 优化键盘操控, 需要聚焦屏幕才可触发键盘控制。

#### 1.5.2（2021-05-13）

1. 增加键盘控制，上、下、左、右、空格
2. 调整代码结构
3. 调整进度条拖拽按钮

```
空格：暂停/启动
上下：音量控制:    -+10%
左右:  快进/倒推  -+ 5s
```

#### 1.5.0（2021-05-08）

1. 重构部分 ui 组件部分 - 从父组件中抽离

#### 1.4.7（2021-04-02）

1. 增加监听 flv mediaSource end 标记
2. 优化 flv 订阅事件

#### 1.4.6（2021-04-02）

1. 优化缓存。
2. 增加缓冲条。

#### 1.4.30-bate1（2021-03-25）

1. 新增播放器导航栏
