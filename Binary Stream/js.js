'use strict';

var videoStream = null;
var videoStreamOpen = false;
var videoElement = document.querySelector('video');
var clientOpen = false;
var client = null;


var sendingVideo = false;
var recorder = null;
function sendVideo() {
    if (sendingVideo == false && clientOpen && videoStreamOpen) {
        console.log("Streaming Video to Server");
        sendingVideo = true;

        var mediaRecorder = new MediaStreamRecorder(stream);
        mediaRecorder.mimeType = 'video/webm';
        mediaRecorder.ondataavailable = function (blob) {
            console.log("Data Available");
            client.write(blob);
        };
        mediaRecorder.start(3000);
        //client.send(videoStream);
    }
}

client = new BinaryClient('ws://localhost:9000');

client.on('open', function() {
    clientOpen = true;
    console.log('Client Opened');
    sendVideo();

  //var image = ['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'];
  //var blob = new Blob([image], {type: 'image/jpg'}); // pass a useful mime type here

  //client.send(blob);
});

// Received new stream from server!
client.on('stream', function(stream, meta){
  // Buffer for parts
  var parts = [];
  // Got new data
  stream.on('data', function(data){
    parts.push(data);
  });
  stream.on('end', function(){
    // Display new data in browser!
    var img = document.createElement("img");
    img.src = (window.URL || window.webkitURL).createObjectURL(new Blob(parts));
    console.log("img: " + parts);
    document.body.appendChild(img);
  });
});





navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

function successCallback(stream) {
    videoStreamOpen = true;
    console.log("Video Stream Opened: " + stream);
    videoStream = stream;
    sendVideo();

    //window.stream = stream; // make stream available to console
    videoElement.src = window.URL.createObjectURL(stream);
    videoElement.play();
}

function errorCallback(error){
  console.log('navigator.getUserMedia error: ', error);
}

navigator.getUserMedia({ audio: true, video: true }, successCallback, errorCallback);
