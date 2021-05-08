/*
 * @Author: Allen OYang
 * @Date: 2021-05-06 16:08:14
 * @Descripttion: 
 * @LastEditTime: 2021-05-06 17:00:12
 * @FilePath: /ts-vp/devImport/recoilStore/index.tsx
 */


 import React from 'react';
 import Child1 from './child1';
 import Child2 from './child2';

 const recoilView = () => {
  return (
    <div>
      <Child1 />
      <Child2 />
    </div>
  )
 }

 export default recoilView;