/*
 * @Author: Allen OYang
 * @Date: 2021-12-01 16:43:06
 * @Descripttion:
 * @LastEditTime: 2021-12-07 12:00:05
 * @FilePath: /ts-vp/src/component/video-barrage-dom/core/handler.ts
 */


export const initBulletAnimate = (el: HTMLDivElement) => {
  if (!el) {
    return;
  }
  const animateClass = 'BULLET_ANIMATE';

  let style = document.createElement('style');
  style.classList.add(animateClass);
  document.head.appendChild(style);
  let { width } = el.getBoundingClientRect();
  let from = `from { visibility: visible; transform: translateX(${width}px); }`;
  let to = `to { visibility: visible; transform: translateX(-100%); }`;
  const result = style.sheet!.insertRule(`@keyframes RightToLeft { ${from} ${to} }`, 0);
};



interface containerType {
  trackHeight: number;
  gap: string;
  animate: string;
  pauseOnHover: boolean;
  pauseOnClick: boolean;
  onStart: null;
  onEnd: null;
  loopCount: string;
  duration: number;
  delay: number;
  direction: string;
  animateTimeFun: string;
  currScreen: {
    allHide: boolean;
    allPaused: boolean
  }
}

export const getContainer = (opts: Partial<containerType>) => {
  const {
    currScreen = {
      allHide: false,
      allPaused: false
    },
    // 跑道高度
    trackHeight = 50,
    // 弹幕之间的间距
    gap = '10px',
    animate = 'RightToLeft',
    pauseOnHover = true,
    pauseOnClick = false,
    onStart = null,
    onEnd = null,
    loopCount = '1',
    duration = 10,
    delay = 0,
    direction = 'normal',
    animateTimeFun = 'linear'
  } = opts;
  // 创建单条弹幕的容器
  const bulletContainer = document.createElement('div');
  // 随机ID
  bulletContainer.id = Math.random()
    .toString(36)
    .substring(2);

  // 设置弹幕容器的初始样式
  bulletContainer.style.transitionProperty = 'opacity';
  bulletContainer.style.transitionDuration = '0.5s';
  bulletContainer.style.cursor = 'pointer';
  bulletContainer.style.position = 'absolute';
  bulletContainer.style.left = '0';
  // bulletContainer.style.zIndex = zIndex;
  bulletContainer.style.visibility = 'hidden';
  bulletContainer.style.animationName = animate;
  bulletContainer.style.animationIterationCount = loopCount;
  bulletContainer.style.animationDelay = `${delay}s`;
  bulletContainer.style.animationDirection = direction;
  bulletContainer.style.animationDuration = `${duration}s`;
  bulletContainer.style.animationTimingFunction = animateTimeFun;

  // 性能小优化
  bulletContainer.style.willChange = 'transform';
  // 隐藏
  if (currScreen.allHide) {
    bulletContainer.style.opacity = '0';
  }
  // pause on hover
  if (pauseOnHover) {
    bulletContainer.addEventListener(
      'mouseenter',
      () => {
        console.log('enter');

        bulletContainer.style.animationPlayState = 'paused';
      },
      false
    );
    bulletContainer.addEventListener(
      'mouseleave',
      () => {
        console.log('leave');
        if (!currScreen.allPaused && !bulletContainer.dataset.clicked) {
          bulletContainer.style.animationPlayState = 'running';
        }
      },
      false
    );
  }
  // pauseonClick
  if (pauseOnClick) {
    bulletContainer.addEventListener(
      'click',
      evt => {
        console.log(evt);
        let currStatus = bulletContainer.style.animationPlayState;
        if (currStatus == 'paused' && bulletContainer.dataset.clicked) {
          bulletContainer.dataset.clicked = '';
          bulletContainer.style.animationPlayState = 'running';
        } else {
          bulletContainer.dataset.clicked = 'true';
          bulletContainer.style.animationPlayState = 'paused';
        }
      },
      false
    );
  }
  return bulletContainer;
};



export const defaultOptions = {
  // 跑道高度
  trackHeight: 50,
  // 弹幕之间的间距
  gap: '10px',
  animate: 'RightToLeft',
  pauseOnHover: true,
  pauseOnClick: false,
  onStart: null,
  onEnd: null,
  loopCount: 1,
  duration: 10,
  delay: 0,
  direction: 'normal',
  animateTimeFun: 'linear'
};