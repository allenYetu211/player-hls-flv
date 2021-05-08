/*
 * @Author: Allen OYang
 * @Date: 2021-05-06 16:53:38
 * @Descripttion: 
 * @LastEditTime: 2021-05-06 17:44:00
 * @FilePath: /ts-vp/devImport/recoilStore/child1.tsx
 */

import React from 'react';
import { useRecoilState } from "recoil";
import { textState } from './store/index';

import action from './action';

export default () => {

  const [text, setText] = useRecoilState(textState);

  return (
    <div>
      <button onClick={() => {
        setText(text - 1)
      }}> - </button>

      <button onClick={() => {
        setText(text + 1)
      }}> + </button>

      <button onClick={() => {
        action.addCount()
      }}> + </button>


      <button onClick={() => {
        action.lessCount()
      }}> - </button>
    </div>
  )
}