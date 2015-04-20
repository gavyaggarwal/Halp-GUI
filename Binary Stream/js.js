'use strict';

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var constraints = {audio: false, video: true};
var video = document.querySelector('video');
var link = document.getElementById('link');

function successCallback(stream) {
  window.stream = stream; // stream available to console
  console.log("Stream Available: " + JSON.stringify(stream));
  if (window.URL) {
    var url = window.URL.createObjectURL(stream);
    video.src = url;
  } else {
    video.src = stream;
  }

  var client = new BinaryClient('ws://localhost:9000');
  // Received new stream from server!
  client.on('stream', function(stream, meta){
    // Buffer for parts
    var parts = [];
    // Got new data
    stream.on('data', function(data){
      parts.push(data);
      console.log("Received Data: " + data);
    });
    stream.on('end', function(){
      // Display new data in browser!
      //var video = document.createElement("img");
      //img.src = (window.URL || window.webkitURL).createObjectURL(new Blob(parts));
      //document.body.appendChild(img);
    });
  });
}

function errorCallback(error){
  console.log('navigator.getUserMedia error: ', error);
}

navigator.getUserMedia(constraints, successCallback, errorCallback);
