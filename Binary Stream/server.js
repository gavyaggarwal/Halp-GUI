var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');

console.log("Starting Server");
// Start Binary.js server
var server = BinaryServer({port: 9000});
// Wait for new user connections
server.on('connection', function(client){
  console.log("Connection Received");
  var file = fs.createReadStream(__dirname + '/flower.jpg');
  client.send(file);
});
