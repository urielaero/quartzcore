var twitter = require('./Twitter'),
    interLed,
    interRgb;

var rgbs = [0, 1, 0]
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

        interLed = setInterval(function(){
          //console.log(init, !init);
          clients.send(id, '@1');
        }, 5000);

    },
    rgb: function(id, r, g, b){
      console.log(r, g, b);
      if(!interRgb)
      interRgb = setInterval(function(){
        var green = ['@greoff', '@greon'],
            blue = ['@bluoff', '@bluon'],
            red = ['@redoff', '@redon'];
        clients.send(id, green[rgbs[0]?1:0] + blue[rgbs[1]?1:0] + red[rgbs[2]?1:0]);
        rgbs[0] = !rgbs[0];
        rgbs[1] = !rgbs[1];
        rgbs[2] = !rgbs[2];
      }, 5000);
    }
  }
};
