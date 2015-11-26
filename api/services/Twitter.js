var Twitter = require('twitter'),
    twitter = new Twitter({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token_key:  process.env.TOKEN_KEY,
      access_token_secret: process.env.TOKEN_SECRET
    });

var streams = [];
module.exports = {
  on: function(hastag, onNew){
    twitter.stream('statuses/filter', {track: hastag}, function(stream) {
      stream.on('data', function(tweet) {
        console.log('tweet');
        onNew(tweet.text);
      });

      stream.on('error', function(error) {
        console.log('error');
        console.log(error);
      });
      streams.push(stream);
      console.log(stream.destroy);
    });
  },
  destroy: function(){
    streams.forEach(function(s){
      console.log('destroy');
      s.destroy();
    });
  }
}
