/**
 * @jest-environment jsdom
 */


import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import PlayerVideo from '../src/index';
// import PlayerVideo from '../dist/index';

let container = null;

beforeEach(() => {
  // 创建一个 DOM 元素作为渲染目标
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // 退出时进行清理
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});



it("渲染有或无名称", () => { 
  act(() => {
    render(<PlayerVideo {...mp4} />, container);
  });
  console.log('container：：：：：：', container);
	// render(<PlayerVideo {...mp4} />, container);
	// unmountComponentAtNode(container);
  // expect(container.textContent).toBe("嘿，陌生人");
});


// -----


const mp4 = {
  type: 'mp4',
  multiple: {
    list: [{ text: '001', value: 1 }, { text: '002', value: 2 }, { text: '003', value: 3 }],
    initIndex: 2
  },
  autoplay: false,
  isMobile: false,
  duration: 54918500,
  thumbnail: {
    picture: 'https://testdevcdn.xylink.com/test-video/bimg.jpg',
    count: 12, // 图片总数
    backgroundSize: 3840, // 图片分辨率
  },
  src:
    "http://testqavoddownload.xylink.com/vodfiles/downloadfiles/shareLink/cf3f247f-18f9-4f91-abc9-bfe80e7da1a9.mp4?auth_key=1610710530-0-0-a31a1e14fd1d0715e4b12226e051d8e8",
}