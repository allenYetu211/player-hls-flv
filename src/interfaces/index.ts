


export interface IMultiStreams {
    src: string;
    text: string
}

export interface IMultiStreamsContainer {
  multiStreams: IMultiStreams[];
  playIndex: number;
}


export interface initConfig {
  type?: 'flv' | 'hls' | 'mp4' | 'm3u8',
  src?: string;
  autoplay?: boolean;
  option?: IMultiStreamsContainer;
  isMobile?: boolean;
  hideControl?: boolean;
  hideMultiCode?: boolean;
  hideRefresh?: boolean;
  multiple?: IMultiple,
  vod?: boolean,
  poster?: string;
  duration?: string;
}


export type Element = HTMLVideoElement

export interface videoConfig extends initConfig {
  type?: 'flv' | 'hls' | 'mp4' | 'm3u8',
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