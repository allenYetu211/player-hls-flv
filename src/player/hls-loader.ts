import Hls from 'hls.js';


function process(playlist:any) {
  return playlist;
}


export default class Loader extends Hls.DefaultConfig.loader {

  constructor(config:any) {
    super(config);
    var load = this.load.bind(this);
    this.load = function(context:any, config:any, callbacks:any) {
      load(context,config,callbacks);
    };
  }
}