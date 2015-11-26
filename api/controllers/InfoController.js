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
  }
};

