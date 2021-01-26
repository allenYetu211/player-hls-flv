/**
 * @jest-environment jsdom
 */


import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';

import PluginDuration from '../plugIn-duration';


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


describe('PluginDuration', () => {
  it("视频时长为0", () => {
    act(() => {
      render(<PluginDuration
        videoDuration="00:00"
        playProgress="00:05" />,
        container);
    })
    expect(container.textContent).toBe("00:05 ");
  })

  
  it(" 视频时长为非 0", () => {
    act(() => {
      render(<PluginDuration
        videoDuration="00:10"
        playProgress="00:05" />,
        container);
    })
    expect(container.textContent).toBe("00:05 / 00:10");
  })
})