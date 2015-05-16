var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');

console.log("Starting Server");
// Start Binary.js server
var server = BinaryServer({port: 9000});
// Wait for new user connections
server.on('connection', function(client) {

    console.log("Connection Received");
    client.on('stream', function(stream, meta) {
        console.log("Receiving Data");
        var streamOpen = false;
        var received = false;
        var parts = [];
        var writeStream = fs.createWriteStream("received_data.mp4");
        writeStream.once('open', function(fd) {
            streamOpen = true;
            for (var i = 0; i < parts.length; i++) {
                writeStream.write(parts[i]);
            }
            if (received) {
                writeStream.end();
            }
        });

        stream.on('data', function(data) {
            console.log("Receieved Some Data");
            if(streamOpen) {
                writeStream.write(data);
            } else {
                parts.push(data);
            }

        });

        stream.on('end', function() {
            received = true;
            if (streamOpen) {
                writeStream.end();
            }
            console.log("Data Stored in received_data.mp4");
            //img.src = (window.URL || window.webkitURL).createObjectURL(new Blob(parts));
            //console.log("Recieved Data: " + parts);
        });
    });

  /*
  console.log("Sending Data");
  var file = fs.createReadStream(__dirname + '/flower.jpg');
  client.send(file);
  */
});
