type LEVEL = 'ALL' | 'DEBUG' | 'ERROR' | 'INFO' | 'LOG'


const LeveLNumber: {
  [value: string]: number
} = {
  'ALL': 5,
  'ERROR': 4,
  'DEBUG': 3,
  'INFO': 2,
  'LOG': 1
}



class Logs {
  private level: LEVEL = 'ALL';
  private levelNumber: number = 5;
  private storageLog: { [valu: string]: string | object }[] = [];

  constructor(level: LEVEL) {
    this.level = level;
    this.levelNumber = LeveLNumber[level];
  }



  private basisLog(text: string, type: string, color: string) {
    console.log(
      `%c ${type}: %c ${text}`,
      `background: ${color} ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff`,
      'background:transparent'
    )
  }

  public info(value: string | Object) {
    this.handlerLog(value, 'INFO', '#5bdcf1')
  }

  public error(value: string | Object) {
    this.handlerLog(value, 'ERROR', '#f90d0d')
  }

  public debug(value: string | Object) {
    this.handlerLog(value, 'DEBUG', '#e2992c')
  }

  public log(value: string | Object) {
    this.handlerLog(value, 'LOG', '#41ec6e')
  }
  
  private handlerLog(value: string | Object, type: string, color: string) {
    if (typeof value === 'object') {
      this.basisLog('', 'object start ', '#41ec6e')
      console.dir(value)
      this.basisLog('', 'object   end ', '#41ec6e')
      return
    }

    // 小于预设级别权限显示
    if (LeveLNumber[type] <= this.levelNumber) {
      this.basisLog(value, type, color);
      return  
    }
    // 存储为加载log日志
    this.storageLog.push({
      [type]: value
    })
  }

  public getStorageLog () {
    return  this.storageLog;
  }
}


// export default Logs;

let log: Logs;
const logInit = (value: LEVEL): Logs => {
  if (log) {
    return log;
  }
  log = new Logs(value);
  return log;
}

export {
  logInit,
  log
};

