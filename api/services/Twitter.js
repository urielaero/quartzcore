var keys = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key:  process.env.TOKEN_KEY,
  access_token_secret: process.env.TOKEN_SECRET
};

if(!keys.consumer_key)
  console.log('No load twitter keys');

var Twitter = require('twitter'),
    twitter = new Twitter(keys);

var streams = [];
var previousHashtag;
module.exports = {
  on: function(hastag, onNew){
    if(previousHashtag != hastag){
      previousHashtag = hastag;
      this.destroy();
    }
    twitter.stream('statuses/filter', {track: hastag}, function(stream) {
      console.log('Twitter on: ', hastag);
      stream.on('data', function(tweet) {
        onNew(tweet.text);
      });

      stream.on('error', function(error) {
        console.log('error twitter api');
      });
      streams.push(stream);
    });
  },
  destroy: function(){
    streams.forEach(function(s){
      s.destroy();
    });
    streams.splice(0, streams.length);
  }
}
