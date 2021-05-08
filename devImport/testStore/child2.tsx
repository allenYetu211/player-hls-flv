/*
 * @Author: Allen OYang
 * @Date: 2021-04-22 09:24:56
 * @Descripttion: 
 * @LastEditTime: 2021-04-22 09:24:56
 * @FilePath: /ts-vp/src/testStore/child2.tsx
 */


import React from 'react';
import { useStore } from './store'

const child2 = () => {

  const [state] = useStore()
  return (
    <div>
      {state.count}
    </div>
  )
}

export default child2;