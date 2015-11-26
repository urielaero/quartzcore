
window.onload = function(){

  console.log('load');
  var p = document.querySelector('p'),
  count = 1;
  io.socket.get('/info/register', function (data, jwres){
    io.socket.on('update', function(res){
      console.log('se recibio');
      console.log(res);
      p.textContent = 'count: ' + count +  ' sid: ' + res.sid + ' value: ' + res.value;
      count++;

    });
  });


};
