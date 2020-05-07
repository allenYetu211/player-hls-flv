import Hls from 'hls.js';


function process(playlist:any) {
  console.log('playlist', playlist)
  return playlist;
}


export default class pLoader extends Hls.DefaultConfig.loader {

  constructor(config:any) {
    super(config);
    var load = this.load.bind(this);
    this.load = function(context, config, callbacks) {
      if(context.type == 'manifest') {
        var onSuccess = callbacks.onSuccess;
        callbacks.onSuccess = function(response, stats, context) {
          response.data = process(response.data);
          onSuccess(response,stats,context);
        }
      }
      load(context,config,callbacks);
    };
  }
}