var Stream = require('stream');
var Duplex = Stream.Duplex;

function streamPipe(){
  var set = false;
  var duplex_ = Duplex({ objectMode:true });
  duplex_._read = function(data){
    //console.log('read');
    //this.push(data);
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
    twitter = require('./Twitter'),
    clients = require('./Clients'),
    cmd = require('./Console')(clients),
    room = 'home';

var tcp_port = process.env.TCPPORT || 1338;

net.createServer(function(socket){
  var dup = streamPipe();
  socket.pipe(dup).pipe(socket);
  //dup.pipe(socket);
  /*
  setInterval(function(){
    console.log('run');
    dup.write('asdasd');
  }, 1000);
  */
  //pipe.write('asdas');
  var ip = socket.remoteAddress;
  //clients.add(ip, socket);
  var id = false;
  console.log('connect', ip);
  socket.on('data', function(data){
    var data = data.toString(),
        info = data.split(',');

    if(info.length && parseInt(info[0]) && !id){
      clients.add(info[0], dup);
      id = info[0];
      if(info[0] == '3'){
        cmd.led('3', info[1]);
      }
    }


    console.log('content', info);
  });

  socket.on('close', function(){
    dup.end();
    console.log('remove id', id);
    clients.removeId(id);
  });

  //socket.write('yolo!');
}).listen(tcp_port, '0.0.0.0');
console.log('tcp_port', tcp_port);

cmd.twitter('#Empire', "2");
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

