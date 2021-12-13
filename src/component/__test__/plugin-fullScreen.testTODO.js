/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';

import PluginFullScreen from '../plugin-fullScreen';


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

it("PluginFullScreen:  全屏触发", () => {
  const videoEl = document.createElement('video');
  act(() => {
    render(<PluginFullScreen
      element={videoEl} />,
      container);
  })
  // console.log('container.innerHTML', container.innerHTML)
  expect(container.innerHTML).toEqual('<div class="icon"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M409.6 153.6a51.2 51.2 0 0 1 51.2 51.2v614.4a51.2 51.2 0 0 1-102.4 0V204.8a51.2 51.2 0 0 1 51.2-51.2z m256 0a51.2 51.2 0 0 1 51.2 51.2v614.4a51.2 51.2 0 0 1-102.4 0V204.8a51.2 51.2 0 0 1 51.2-51.2z" p-id="3228" fill="#ffffff"></path></svg></div>');
})


// it("PluginFullScreen:  全屏取消", () => {
//   const onClickMock = jest.fn();
//   act(() => {
//     render(<PluginFullScreen
//       playerState={false}
//       onSwitchPlayer={onClickMock} />,
//       container);
//   })
//   expect(container.innerHTML).toEqual('<div class="icon"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M790.3744 474.0096L343.6544 167.68l-0.1536 0.1024A51.6096 51.6096 0 0 0 307.8656 153.6c-28.4672 0-51.5584 22.8352-51.5584 51.0464 0 15.5136-0.6656 45.824 0 45.1584v567.552c0 28.16 23.04 50.9952 51.5584 50.9952 13.824 0 26.4704-5.4272 35.7376-14.336v0.0512l446.7712-306.3296a50.688 50.688 0 0 0 15.7696-36.7616v-0.1024-0.1024a50.688 50.688 0 0 0-15.7696-36.7616z" p-id="3010" fill="#FFFFFF"></path></svg></div>');
// })