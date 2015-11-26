var Stream = require('stream');
var Duplex = Stream.Duplex;

function streamPipe(){
  console.log('stream');
  var duplex_ = Duplex({ objectMode:true });
  duplex_._read = function(data){
    //console.log('read');
    //this.push(data);
  };

  duplex_._write = function(chunk, enc, cb){
    console.log('write', chunk.toString());
    this.push(chunk + '\n');
    cb();
  };



  return duplex_;
}

var net = require('net'),
    twitter = require('./Twitter'),
    clients = require('./Clients'),
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
  dup.on('data', function(data){
    var data = data.toString(),
        info = data.split(',');

    if(info.length && parseInt(info[0]) && !id){
      clients.add(info[0], dup);
      id = info[0];
    }

    console.log('content', info);
  });

  dup.on('close', function(){
    console.log('remove id', id);
    clients.removeId(id);
  });

  //socket.write('yolo!');
}).listen(tcp_port, '0.0.0.0');
console.log('tcp_port', tcp_port);

//for test
//clients.add('192.168.0.1', { write: function(text){
//  console.log('desde write', text);
//}});

//clients.setId('1', '192.168.0.1')
//

twitter.on('#Empire', function(text){
  clients.send('2', text);
});
/*
setInterval(function(){
  clients.send('2', 'twwweeet');
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
