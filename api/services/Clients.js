
var clients_ids_socket = {},// ids => socket
    clients_ids_ips = {}, // id => ip
    clients_ips_ids = {}; // ip => id

module.exports = {
  add: function(id, socket){
    clients_ids_socket[id] = socket;
  },

  send: function(id, text){
    socket = clients_ids_socket[id];
    if(socket){
      socket.write(text);
      return true;
    }
    return false;
  },
  removeId: function(id){
    delete clients_ids_socket[id];
  },
};
