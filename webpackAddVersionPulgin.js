const ReplaceLoadeer = require('./util/replaceLoader');

class webpackAddVersionPulgin {
  apply(compiler) {

    compiler.plugin('emit',  async (compilation, callback) => {
      const version = await  ReplaceLoadeer()
      compilation.chunks.forEach(function (chunk) {
        chunk.files.forEach(function (filename) {
          const source = compilation.assets[filename].source();
          // TODO 通过外部传入
          const logo = 'console.info(`,,                                           \n  ,,,     fffffffff        i                iiiiiii      i    \n  ,,,,   ffff  ffff        i       i        iiiiiii  i   i    \n   ,,,, fff      fff       i      iiiiii    iiiiiii  iiiiiiiii\n    ,,,,fff       ff    i  i i   iiiiiiii   i     i     iii   \n     ,,,;f        ff   ii  i ii iiiiiiiii   iiiiiii ii  i i   \n      ,,,;        fff  ii  i ii  i  ii  i   ii       i iiiiiii\n     ,,,;f        ff   i   i  ii i  ii  i iiiii i i  i    i   \n    ,,,,fff       ff  i    i   i iiiiiiii ii i  i i  i iiiiiii\n   ,,,, fff      fff       i     iiiiiiii  ii  ii i  ii   i   \n  ,,,,   ffff  ffff     iiii    iiiiiiiiiiii iiiiii iiiiiiiiii\n  ,,,     fffffffff     iii                  i          iiiiii\n  ,,       fffffff                                            \n  `)\n'
          const versionInfo = '/*!* @license   Licensed under MIT license * @version:   '+ version +' */ \n console.info(`\n %c==============================\n @player: player-hls-flv \n @version: '+ version +' \n ==============================\n  `, `color: #9980FF`)\n\n  ;'
          
          const rawSource = `${logo}\n ${versionInfo} \n\n ${source}`;
          Promise.resolve(rawSource).then( async (source) => {
            compilation.assets[filename] = {
              source: () => source,
              size: () => source.length
            };
            callback();
          });
        });
      });
    });


    compiler.hooks.emit.tap('LogWebpackPlugin', () => {
      // 在 emit 事件中回调 emitCallback
      console.log('emit 事件发生啦，所有模块的转换和代码块对应的文件已经生成好~')
    });
    compiler.hooks.done.tap('LogWebpackPlugin', (err) => {
      // 在 done 事件中回调 doneCallback
      console.log('done 事件发生啦，成功构建完成~')
    });

    compiler.hooks.compilation.tap('LogWebpackPlugin', () => {
      // compilation（'编译器'对'编译ing'这个事件的监听）
      console.log("The compiler is starting a new compilation...")
    });
    compiler.hooks.compile.tap('LogWebpackPlugin', () => {
      // compile（'编译器'对'开始编译'这个事件的监听）
      console.log("The compiler is starting to compile...")
    });
  }
}

// 导出插件
module.exports = webpackAddVersionPulgin;