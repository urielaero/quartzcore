/**
 * InfoController
 *
 * @description :: Server-side logic for managing infoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var room = 'home';
module.exports = {
  change: function(req, res){
    res.ok();

    var sid = req.param('sid'),
        value = req.param('value');

    console.log('req', sid);

    sails.io.sockets.in(room).emit('update', {
      sid: sid,
      value: value
    });
  },

  register: function(req, res){
    console.log('register!');
    req.socket.join(room);
    req.socket.on('disconnect',function(){
        req.socket.leave(room);
    });
    res.ok();
  },
  twitter: function(req, res){
    var hashtag = req.param('hashtag');
    if(!hashtag)
      return res.json({error: 'no hashtag'});

    Hashtag.create({text: hashtag.trim()}).exec(function(err, h){
      Tcp.cmd.twitter(h.text, '2');
      res.ok();
    });
  },
  hashtag: function(req, res){
    res.json({text: global.initVars.hashtag});
  },
  rgb: function(req, res){
    var r = req.param('r'),
        g = req.param('g'),
        b = req.param('b');

        Tcp.cmd.changeRgb('4', r, g, b);
    res.ok();
  }
};

