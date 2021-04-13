/*
 * @Author: Allen OYang
 * @Date: 2021-01-22 14:30:13
 * @Descripttion: 
 * @LastEditTime: 2021-04-13 10:57:17
 * @FilePath: /ts-vp/src/utils/phoneType.ts
 */
const ua = navigator.userAgent;
export const isIOS = () => {
  return /iPhone|iPad/.test(ua)
}

export const isAndroid = () => {
  return /Android/.test(ua)
} 

export const isPc = () => {
  return !/Android|iPhone|SymbianOS|Windows Phone|iPad|iPod/.test(ua);
}

export const isIE = () => {
  return /MSIE/.test(ua) || /Trident\//.test(ua);
}

// 判断微信， qq
export const isTx = () => {
  return /MicroMessenger|mobile mqqbrowser/.test(ua);
}

// tbs版本大于，036849 可以使用同层播放，则使用video全屏， 如果不支持，则使用div全屏
// 判断是否为微信内部，版本是否为tbs播放器
export const tbs = () => {
  // 处理部分手机端，播放器选择问题
  // 安卓手机，微信 QQ浏览器, 并且为TBS内核
  if (isTx() && isAndroid() && /TBS\//.test(ua)) {
      const result = ua.replace(/.*TBS\/(\d*)\s.*/g, '$1');
      return result >= '036849'
  }
  return false;
}


export const deviceType = {
  ios: isIOS(),
  android: isAndroid(),
  pc: isPc(),
  androidTx: isTx() && !isIOS(),
  tbs: tbs(),
  ie: isIE()
}