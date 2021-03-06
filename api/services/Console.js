var twitter = require('./Twitter'),
    interLed,
    interRgb;

var rgbs = [0, 1, 0]
module.exports = function(clients){
  return {
    twitter: function(hashtag, id){
        global.initVars.hashtag = hashtag;
        twitter.on(hashtag, function(text){
          clients.send(id, '@'+text);
        });
     /*
      var count = 0;
      setInterval(function(){
        clients.send(id, hashtag + 'tww' + count++);
      }, 5000);
      */
    },
    led: function(id, init){
        global.initVars.foco = init == '1'?true:false;
        sails.io.sockets.in('home').emit('foco', global.initVars.foco);
        /*
        console.log('Foco on');
        if(interLed)
          clearInterval(interLed)

        interLed = setInterval(function(){
          //console.log(init, !init);
          clients.send(id, '@1');
        }, 5000);
        */
    },
    setLed: function(val){
      global.initVars.foco = val;
      console.log('val', val)
      clients.send('3', val?'@1':'@0');
    },
    setRgb: function(r, g, b){
      console.log('RGB on', r, g, b);
      global.initVars.rgb = {
        r: r == 1 ?true:false,
        g: g == 1 ?true:false,
        b: b == 1 ?true:false
      };

      sails.io.sockets.in('home').emit('rgb', global.initVars.rgb);
      /*
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
      */
    },
    changeRgb: function(id, r, g, b){
      global.initVars.rgb = {
        r: r ,
        g: g ,
        b: b
      };
      clients.send('4', (r?'@redon':'@redoff') + (g?'@greon':'@greoff') + (b?'@bluon':'@bluoff'));
    },
    stop: function(val){
      global.initVars.stop = val;
      sails.io.sockets.in('home').emit('stop', global.initVars.stop?true:false);
    }
  }
};

function check(ops, val){
}
