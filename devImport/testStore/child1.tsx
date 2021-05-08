/*
 * @Author: Allen OYang
 * @Date: 2021-04-22 09:24:49
 * @Descripttion: 
 * @LastEditTime: 2021-04-22 09:24:49
 * @FilePath: /ts-vp/src/testStore/child1.tsx
 */
import React from 'react';
import { useStore } from './store';



const child1 = () => {
  const [, dispatch] = useStore();

  return (
    <div>
      
      <button
        onClick={() => {
          dispatch({ type: 'decrement' })
        }}
      > - </button>

      <button
        onClick={() => {
          dispatch({ type: 'increment' })
        }}
      > + </button>

    </div>
  )
}

export default child1;