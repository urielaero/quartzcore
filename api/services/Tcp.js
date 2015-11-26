var net = require('net'),
    Twitter = require('twitter'),
    clients = require('./Clients'),
    room = 'home';

var twitter = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key:  process.env.TOKEN_KEY,
    access_token_secret: process.env.TOKEN_SECRET
});


net.createServer(function(socket){
  var ip = socket.remoteAddress;
  clients.add(ip, socket);

  socket.on('data', function(data){
    var data = data.toString(),
        info = data.split(',');

    if(info.length && parseInt(info[0]))
      clients.setId(info[0], ip);

    console.log('content', info);
  });

  socket.on('close', function(){
    clients.removeByIp(ip);
  });

  //socket.write('yolo!');

}).listen(1338, '0.0.0.0');

//for test
//clients.add('192.168.0.1', { write: function(text){
//  console.log('desde write', text);
//}});

//clients.setId('1', '192.168.0.1')
//

//removeIp('192.168.0.1');
twitter.stream('statuses/filter', {track: '#IsisEnMexico'}, function(stream) {
  stream.on('data', function(tweet) {
    clients.send('2', tweet.text);
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});
