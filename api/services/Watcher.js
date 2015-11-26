
module.exports = {
  init: function(){
    console.log('load...');
  },
  load: function(id, data){
    emit('load', data);
  },
  updateArduino: function(id, dataString){

  }
};

function emit(channel, data){
    sails.io.sockets.in('home').emit(channel, data);
}
