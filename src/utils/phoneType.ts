const ua = navigator.userAgent;
export const isIOS = () => {
  return /iPhone/.test(ua)
}

export const isAndroid = () => {
  return /Android/.test(ua)
}

export const isPc = () => {
  return !/Android|iPhone|SymbianOS|Windows Phone|iPad|iPod/.test(ua);
}

// 判断微信， qq
export const isTx = () => {
  return /MicroMessenger|mobile mqqbrowser/.test(ua)
}


export const deviceType = {
  ios: isIOS(),
  android: isAndroid(),
  pc: isPc(),
  androidTx: isTx() && !isIOS()
}