# v-player

### 基于
- react 
- flvjs
- hlsjs
---

## 浏览器 
- Windows 10 - IE11
- IE以外所有浏览器

---

## 功能
- [x] 分辨率切换
- [x] 倍速选择
- [x] mp4
- [x] flv 
- [x] hls 
---

## Error Code
| 错误码 | 描述 |
| --- | --- |
| 0001 | 浏览器禁止自动播放，需手动处理播放状态 |
|NETWORK_ERROR| 网络相关错误 |
|STATISTICS_INFO| 提供播放统计信息，如下降帧，当前速度等|
|ERROR| 播放过程中发生的任何错误 |
|MEDIA_ERROR| 与媒体相关的错误(格式错误、解码问题等) |
|OTHER_ERROR| 任何其他未指定的错误 |

---
### 使用

> 安装
```
npm i player-hls-flv
```

>初始参数

```typescript
export interface initConfig {
    type?: 'flv' | 'hls' | 'mp4' | 'm3u8';
    src?: string;
    autoplay?: boolean;
    option?: IMultiStreamsContainer;
}

export interface IMultiStreamsContainer {
    multiStreams: IMultiStreams[];
    playIndex: number;
}

export interface IMultiStreams {
    src: string;
    text: string;
}
```

> 实际引用
```react
import PlayerHlsFlv from 'player-hls-flv';

return (
  <PlayerHlsFlv {...params} />
)
```



