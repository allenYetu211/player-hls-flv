/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
// import {  fireEvent } from '@testing-library/react';

import PluginMultiCode from '../plugIn-multiCode';

const config = [
   { text: '1', value: 1 },
   { text: '2', value: 2 },
   { text: '3', value: 3 },
]

const index = 1

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

it("PluginMultiCode:  倍速", () => {
  const onClickMock = jest.fn();
  act(() => {
    render(<PluginMultiCode
      playIndex={index}
      multiStreams={config}
      onChangePlayIndex={onClickMock} />,
      container);
  })

  // onClickMock()
  expect(container.textContent).toBe(`${config[index].text}123`);
})

it("PluginMultiCode:  倍速异常", () => {
  const onClickMock = jest.fn();
  act(() => {
    render(<PluginMultiCode
      playIndex={5}
      multiStreams={config}
      onChangePlayIndex={onClickMock} />,
      container);
  })

  // onClickMock()
  expect(container.textContent).toBe(`3123`);
})

