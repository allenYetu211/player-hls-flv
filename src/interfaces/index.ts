


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
}


export type Element = HTMLVideoElement

export interface videoConfig extends initConfig {
  type?: 'flv' | 'hls' | 'mp4' | 'm3u8',
  src?: string,
  element: Element,
  autoplay?: boolean;
}