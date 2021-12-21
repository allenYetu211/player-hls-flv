// 计算时长
export const msToTime = (time: string) => {
  const duration = Number(time);
  
	let seconds = Math.floor((duration / 1000) % 60);
	let minutes = Math.floor((duration / (1000 * 60)) % 60);
	let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);



	const ihours = hours < 10 ? `0${hours}` : hours;
	const iminutes = minutes < 10 ? `0${minutes}` : minutes;
	const iseconds = seconds < 10 ? `0${seconds}`: seconds;

  if (hours <= 0) {
    return `${iminutes}:${iseconds}` 
  } 
	return `${ihours}:${iminutes}:${iseconds}`
};

// 获取当前时间
export const now = () => {
	return window.performance ? window.performance.now() : new Date().getTime();
}
