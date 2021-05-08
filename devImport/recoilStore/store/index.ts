/*
 * @Author: Allen OYang
 * @Date: 2021-05-06 16:55:00
 * @Descripttion: 
 * @LastEditTime: 2021-05-06 16:55:01
 * @FilePath: /ts-vp/devImport/recoilStore/store/index.ts
 */

import {atom} from "recoil";

export const textState = atom({
  key: 'textState', // // 全局下保持唯一性
  default: 0, // 初始值
});



