
var clients_ips_socket = {},// ip => socket
    clients_ids_ips = {}, // id => ip
    clients_ips_ids = {}; // ip => id

module.exports = {
  add: function(ip, socket){
    clients_ips_socket[ip] = socket;
  },
  setId: function(id, ip){
    console.log('conocido', id, ip);
    clients_ids_ips[id] = ip;
    clients_ips_ids[ip] = id;
  },
  send: function(id, text){
    var ip = clients_ids_ips[id],
    socket = clients_ips_socket[ip];
    if(socket){
      socket.write(text);
      return true;
    }
    return false;
  },
  removeIp: function(ip){
    var id = clients_ips_ids[ip];
    delete clients_ips_ids[ip]
    delete clients_ips_socket[ip];
    delete clients_ids_ips[id];
  },
};
