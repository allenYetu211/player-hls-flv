
export type Element = HTMLVideoElement

export interface videoConfig {
  type: 'flv' | 'hls' | 'mp4' | 'm3u8',
  src?: string,
  element: Element,
  autoplay?: boolean;
}