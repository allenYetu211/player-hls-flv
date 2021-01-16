//  全屏
export const fullScreen = (element: HTMLVideoElement| HTMLDivElement) => {
  // @ts-ignore
  window.ctarget = element;
  const _element = element as any;
	if (_element.requestFullscreen) {
		_element.requestFullscreen()
	} else if (_element.mozRequestFullScreen) {
		_element.mozRequestFullScreen();
	} else if (_element.webkitRequestFullscreen) {
		_element.webkitRequestFullscreen();
	} else if (_element.msRequestFullscreen) {
		_element.msRequestFullscreen();
	} else if (_element.webkitEnterFullscreen) {
		_element.webkitEnterFullscreen();
	}
};


//  退出全屏
export const exitFullscreen = () => {
  const _document = document as  any;
  console.log('退出全屏 - 1');
	if (_document.fullscreenElement) {
		_document.exitFullscreen()
	} else if (_document.mozExitFullScreen) {
		_document.mozExitFullScreen()
	} else if (_document.webkitExitFullscreen) {
		_document.webkitExitFullscreen()
  } else if (_document.msRequestFullscreen) {
    _document.msRequestFullscreen()
  }
  

};

// 低版本浏览器
// function iefull(){
  //     var el = document.documentElement;
  //     var rfs =  el.msRequestFullScreen;
  //     if(typeof window.ActiveXObject != "undefined") {
  //         //这的方法 模拟f11键，使浏览器全屏
  //         var wscript = new ActiveXObject("WScript.Shell");
  //         if(wscript != null) {
  //             wscript.SendKeys("{F11}");
  //         }
  //     }
  // }