/*
 * @Author: Allen OYang
 * @Date: 2021-01-22 14:30:13
 * @Descripttion: 
 * @LastEditTime: 2021-08-10 16:37:12
 * @FilePath: /ts-vp/src/interfaces/index.ts
 */

import { initConfig } from '../index'


export interface IMultiStreams {
  src: string;
  text: string
}

export interface IMultiStreamsContainer {
  multiStreams: IMultiStreams[];
  playIndex: number;
}


// export interface initConfig {
//   type?: 'flv' | 'hls' | 'mp4' | 'm3u8' | 'dash',
//   src?: string;
//   autoplay?: boolean;
//   option?: IMultiStreamsContainer;
//   isMobile?: boolean;
//   hideControl?: boolean;
//   hideMultiCode?: boolean;
//   hideRefresh?: boolean;
//   hideMultiple?: boolean;
//   hideProgressBar?: boolean;
//   onVideoPlayerState?: (vp: any) => void;
//   multiple?: IMultiple,
//   vod?: boolean,
//   poster?: string;
//   duration?: number;
//   notCache?: boolean;
//   thumbnail?: {
//     picture: string,
//     width?: number,
//     height?: number,
//     count: number;
//     rowCount?: number;
//     backgroundSize: number;
//   };
// }

export type Element = HTMLVideoElement

export interface videoConfig extends initConfig {
  type?: 'flv' | 'hls' | 'mp4' | 'm3u8' | 'dash',
  src?: string,
  element: Element,
  containerEl: HTMLDivElement,
  autoplay?: boolean;
  vod?: boolean;
  poster?: string;
}

export interface IMultiple {
  list: {
    text: string,
    value: number,
  }[],
  initIndex: number
}