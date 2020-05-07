import Hls from 'hls.js';


function process(playlist:any) {
  console.log('playlist', playlist)
  return playlist;
}


export default class Loader extends Hls.DefaultConfig.loader {

  constructor(config:any) {
    super(config);
    var load = this.load.bind(this);
    this.load = function(context:any, config:any, callbacks:any) {
      // console.log('context::', context.levelDetails)
      
      // console.log('config::', config)
      // console.log('callbacks::', callbacks)
      load(context,config,callbacks);
    };
  }
}