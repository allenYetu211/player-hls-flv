/*
 * @Author: Allen OYang
 * @Date: 2021-05-06 17:03:01
 * @Descripttion: 
 * @LastEditTime: 2021-05-06 17:43:00
 * @FilePath: /ts-vp/devImport/recoilStore/action/index.tsx
 */

import {useRecoilState} from "recoil";
import {textState} from '../store/index';

class Action  {
  addCount  () {
    const [text, setText] = useRecoilState(textState);
    setText(text + 1);
  }

  lessCount () {
    const [text, setText] = useRecoilState(textState);
    setText(text - 1);
  }
} 

export default new Action()



