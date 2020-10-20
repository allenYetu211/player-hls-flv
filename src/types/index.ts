
export interface initConfig {
  type?: 'flv' | 'hls' | 'mp4' | 'm3u8' | 'dash',
  src?: string;
  autoplay?: boolean;
  option?: IMultiStreamsContainer;
  isMobile?: boolean;
  hideControl?: boolean;
  hideMultiCode?: boolean;
  hideRefresh?: boolean;
  onVideoPlayerState?: (vp: any) => void;
  multiple?: IMultiple;
  vod?: boolean;
  poster?: string;
  duration?: number;
  thumbnail?: {
    picture: string;
    width?: number;
    height?: number;
    count: number;
    rowCount?: number;
    backgroundSize: number;
  };
}

export interface IMultiple {
  list: {
    text: string,
    value: number,
  }[],
  initIndex: number
}

export interface IMultiStreams {
  src: string;
  text: string
}

export interface IMultiStreamsContainer {
  multiStreams: IMultiStreams[];
  playIndex: number;
}
