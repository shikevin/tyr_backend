var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(3000);

app.get('/', function(req,res){
    res.sendfile(__dirname + '/index.html')
});

io.sockets.on('connection', function(socket){
   socket.on('send message', function(data){
       io.sockets.emit('new message', data);
   });
});