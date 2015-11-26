var Stream = require('stream');
var Duplex = Stream.Duplex;

function streamPipe(){
  var set = false;
  var duplex_ = Duplex({ objectMode:true });
  duplex_._read = function(data){
  };

  duplex_._write = function(chunk, enc, cb){
    var string =  chunk.toString();
    console.log('write', chunk.toString());
    if(!set || string.indexOf('#Empire') != -1  || string.indexOf('@') != -1){
      set = true;
      this.push(chunk + '\r\n');
    }
    cb();
  };



  return duplex_;
}

var net = require('net'),
    clients = require('./Clients'),
    cmd = require('./Console')(clients),
    room = 'home';

var tcp_port = process.env.TCPPORT || 1338;

module.exports.cmd = cmd;


net.createServer(function(socket){
  var dup = streamPipe();
  socket.pipe(dup).pipe(socket),
  ip = socket.remoteAddress,
  id = false;
  console.log('connect', ip);
  socket.on('data', function(data){
    var data = data.toString(),
        info = data.split(',');

    if(info.length && parseInt(info[0]) && !id){
      clients.add(info[0], dup);
      id = info[0];
      if(info[0] == '2'){
        var hashtag =  global.initVars.hashtag;
        console.log('iniciando con:', hashtag);
        cmd.twitter(hashtag, '2');
      }else if(info[0] == '3'){
        cmd.led('3', info[1]);
      }else if(info[0] == '4'){
        cmd.setRgb('4', info[1], info[2], info[3]);
      }
    }


    console.log('content', info);
  });

  socket.on('close', function(){
    dup.end();
    console.log('remove id', id);
    clients.removeId(id);
  });

}).listen(tcp_port, '0.0.0.0');
console.log('Server tcp on: ', tcp_port);



//for test
//clients.add('192.168.0.1', { write: function(text){
//  console.log('desde write', text);
//}});

//clients.setId('1', '192.168.0.1')
//

/*
twitter.on('#Empire', function(text){
  clients.send('2', text);
});
*/
/*
var count = 0;
setInterval(function(){
  console.log('setInterval');
  clients.send('2', '#Empire tww' + count++);
}, 5000);

*/
/*
setTimeout(function(){
  console.log('run');
  twitter.destroy();
  twitter.on('#NoPuedoDecirQueNo', function(text){
    clients.send('2', text);
  });

}, 9900);
*/

