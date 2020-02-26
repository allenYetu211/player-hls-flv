//  全屏
export const fullScreen = (element: HTMLDivElement) => {
  const _element = element as any;
	if (_element.requestFullscreen) {
		_element.requestFullscreen();
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
  const _document = document as  any
	if (_document.fullscreenElement) {
		_document.exitFullscreen();
	} else if (_document.mozExitFullScreen) {
		_document.mozExitFullScreen();
	} else if (_document.webkitExitFullscreen) {
		_document.webkitExitFullscreen();
	}
};
