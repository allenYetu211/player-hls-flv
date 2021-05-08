/*
 * @Author: Allen OYang
 * @Date: 2021-05-08 19:42:36
 * @Descripttion: 
 * @LastEditTime: 2021-05-08 19:45:24
 * @FilePath: /ts-vp/src/component/video-keyboard/index.tsx
 */


 import React, {useEffect} from 'react';

const VideoKeyBoard: React.FC<any> = (props) => {
  useEffect(() => {
    console.log('绑定键盘事件')
  }, [])

  return (
    <>
      {props.children}
    </>
  )
}

export default VideoKeyBoard;