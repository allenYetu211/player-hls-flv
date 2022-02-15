/*
 * @Author: Allen OYang
 * @Date: 2022-02-15 11:43:39
 * @LastEditTime: 2022-02-15 11:43:39
 */

import { initConfig } from '../../src/index';

const DashConfig: initConfig = {
  type: 'dash',
  src: 'https://ainemo-vodcdn.oss-cn-beijing.aliyuncs.com/vodfiles/sharefiles/dash_single_file/training.mpd',
  isMobile: false,
  multiple: {
    list: [{ text: '1xx', value: 1 }, { text: '2xx', value: 2 }, { text: '3xx', value: 3 }],
    initIndex: 1
  },
  autoplay: false,
  vod: true,
}

export {DashConfig}