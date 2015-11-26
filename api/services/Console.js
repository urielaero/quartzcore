var twitter = require('./Twitter'),
    inter;
module.exports = function(clients){
  return {
    twitter: function(hashtag, id){
        twitter.on('#Empire', function(text){
          clients.send('2', '@'+text);
        });
     /*
      var count = 0;
      setInterval(function(){
        clients.send(id, hashtag + 'tww' + count++);
      }, 5000);
      */
    },
    led: function(id, init){
        if(inter)
          clearInterval(inter)

        inter = setInterval(function(){
          //console.log(init, !init);
          clients.send(id, '@1');
        }, 5000);

    }
  }
};
