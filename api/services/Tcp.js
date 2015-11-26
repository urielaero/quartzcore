var net = require('net'),
    twitter = require('./Twitter'),
    clients = require('./Clients'),
    room = 'home';

var tcp_port = process.env.TCPPORT || 1338;

net.createServer(function(socket){
  var ip = socket.remoteAddress;
  clients.add(ip, socket);

  console.log('connect', ip);
  socket.on('data', function(data){
    var data = data.toString(),
        info = data.split(',');

    if(info.length && parseInt(info[0]))
      clients.setId(info[0], ip);

    console.log('content', info);
  });

  socket.on('close', function(){
    clients.removeIp(ip);
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

twitter.on('#DeberíaSerAvengerPorque', function(text){
  clients.send('2', text);
});

/*
setTimeout(function(){
  console.log('run');
  twitter.destroy();
  twitter.on('#NoPuedoDecirQueNo', function(text){
    clients.send('2', text);
  });

}, 9900);
*/
