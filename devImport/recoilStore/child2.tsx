/*
 * @Author: Allen OYang
 * @Date: 2021-05-06 16:54:20
 * @Descripttion: 
 * @LastEditTime: 2021-05-06 17:00:33
 * @FilePath: /ts-vp/devImport/recoilStore/child2.tsx
 */

import React from 'react';
import {useRecoilState} from "recoil";
import {textState} from './store/index';

export default () => {
  const [text] = useRecoilState(textState);
  return (
    <div>
      VALUE :: {text}
    </div>
  )
}