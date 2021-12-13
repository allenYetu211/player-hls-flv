/*
 * @Author: Allen OYang
 * @Date: 2021-12-01 15:24:26
 * @Descripttion:
 * @LastEditTime: 2021-12-13 09:48:15
 * @FilePath: /ts-vp/src/component/video-barrage-dom/core/index.ts
 */

import { videoBarrageType } from '@g/index';

import { initBulletAnimate, getContainer, defaultOptions } from './handler';

import ReactDOM from 'react-dom';

import React from 'react';

interface Config extends videoBarrageType {
  el: HTMLDivElement;
}

class BarrageDomClass {
  private tracksConfig: videoBarrageType = {};

  private tracks: [][] = [];

  private el: HTMLDivElement;

  private options = defaultOptions;

  private queues: [][] = [];

  // private observer: IntersectionObserver;

  private tracksLineCount: number = 0;


  constructor({
    el,
    fontSize = 22,
    defaultBarrageState,
    tracksLine,
    trackSpacing = 50,
    textSpacing = 60,
  }: Config) {
    this.el = el;
    const { height } = el.getBoundingClientRect();
    this.tracksConfig = {
      fontSize,
      defaultBarrageState,
      tracksLine: tracksLine || Math.floor(height / (fontSize! + 5)),
      trackSpacing, textSpacing
    };
    this.tracks = Array.from({ length: this.tracksConfig.tracksLine! }, () => []);
    initBulletAnimate(el);
  }

  push(item: {
    value: string,
    top?: number,
    left?: number,
    color?: string,
    speed?: number,
    viewableArea?: number
  }) {
    const bulletContainer = getContainer({});
    // console.log('bulletContainer', bulletContainer);
    this.render(item.value, bulletContainer)
  }

  start() {

  }


  // container: Element | DocumentFragment | null,

  render(item: string, container: any, track: any = 200, top: any = 200) {

    this.el.appendChild(container);

    const { gap, trackHeight } = this.options;
    // 弹幕渲染进屏幕
    ReactDOM.render(
      // @ts-ignore
      item, container, () => {
        // let trackTop = track * trackHeight;

        // 在不同的管道进行插入。
        this.tracksLineCount += 1;
        if (this.tracksLineCount > this.tracksConfig.tracksLine!) {
          this.tracksLineCount = 1
        }

        let trackTop = this.tracksLineCount * trackHeight;
        console.log('trackTop', trackTop);

        container.dataset.track = track;
        // container.style.top = top ? top : `${trackTop}px`;
        container.style.top = `${trackTop}px`;

        let options = {
          root: this.el,
          rootMargin: `0px ${gap} 0px 0px`,
          // rootMargin: `0px 10px 0px 0px`,
          threshold: 1.0
        };

        const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
          console.log('entries', entries);
          entries.forEach((entry: IntersectionObserverEntry) => {

            if (!entry.isIntersecting) {
              console.log('entry.target', entry.target);
              entry.target.remove();
              return
            }

            // 完全处于视窗之内
            const { intersectionRatio, target } = entry;


            // console.log('intersectionRatio', intersectionRatio);
            // console.log('bullet id', target.id, intersectionRatio);
            if (intersectionRatio >= 1) {
              // @ts-ignore
              let trackIdx = target.dataset.track;


              // console.log('curr track value', this.tracks[trackIdx]);
              // console.log('curr queues', this.queues);

              // if (this.queues.length) {
              //   const {item, container, customTop} = this.queues.shift();
              //   this.render(item, container, trackIdx, customTop);
              // } else {
              //   this.tracks[trackIdx] = 'feed';
              // }

            }
          });
        }, options);


        observer.observe(container);
      }
    );
  };
  clean() {

  }

  open() {

  }

  stop() {

  }

}

export default BarrageDomClass;