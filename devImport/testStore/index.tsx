/*
 * @Author: Allen OYang
 * @Date: 2021-04-22 09:23:20
 * @Descripttion: 
 * @LastEditTime: 2021-04-29 11:34:56
 * @FilePath: /ts-vp/src/testStore/index.tsx
 */


import React from  'react';
import Child1 from './child1';
import Child2 from './child2';
import { StoreProvider } from "./store"; 

const StoreInfo = () => {
  return (
    <StoreProvider>
      <Child1 />
      <Child2 />
    </StoreProvider>
  )
}

export default StoreInfo;