//  全屏
export const fullScreen = (element: HTMLVideoElement | HTMLDivElement) => {
  // @ts-ignore
  window.ctarget = element;
  const el = element as any;
  const rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
  if (rfs) {
    rfs.call(el);
  } else if (typeof window.ActiveXObject !== "undefined") {
    //for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
    iefull()
  } else {
    console.log("浏览器不支持全屏");
  }
};

//  退出全屏
export const exitFullscreen = () => {
  const el: any = parent.document;
  const cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen;

  if (cfs) {
    cfs.call(el);
  } else if (typeof window.ActiveXObject !== "undefined") {
    iefull()
  } else {
    alert("切换失败,可尝试Esc退出");
  }
};

// 低版本浏览器
function iefull() {
  var wscript = new ActiveXObject("WScript.Shell");
  if (wscript != null) {
    wscript.SendKeys("{F11}");
  }
}