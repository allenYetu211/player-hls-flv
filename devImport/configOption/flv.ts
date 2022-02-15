/*
 * @Author: Allen OYang
 * @Date: 2022-02-15 11:42:48
 * @LastEditTime: 2022-02-15 11:42:48
 */

import { initConfig } from '../../src/index';

const FlvConfig: initConfig = {
  type: 'flv',
  autoplay: false,
  isMobile: true,
  option: {
    multiStreams: [
      {
        src: 'http://prdpulllive.xylink.com/prdnemo/9680cebc796b73450179794af8530e57.flv?auth_key=a8ed83a7761372ef5197981d0b36e111-1621332004-357646ad72d448eea39ea00cd8bde223-',
        text: '标清',
      },
      {
        src:
          'http://prdpulllive.xylink.com/prdnemo/9680cebc796b73450179794af8530e57.flv?auth_key=a8ed83a7761372ef5197981d0b36e111-1621332004-357646ad72d448eea39ea00cd8bde223-',
        text: '高清',
      },
    ],
    playIndex: 1,
  },
}

export {FlvConfig}