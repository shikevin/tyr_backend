var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');

var app = express();
var nicknames = [];
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(3000);

app.get('/', function(req,res){
    res.sendfile(__dirname + '/index.html')
});

io.sockets.on('connection', function(socket){
    socket.on('new user', function(data, callback){
        if(nicknames.indexOf(data) != -1){
            callback(false);
        } else {
            callback(true);
            socket.nickname = data;
            nicknames.push(socket.nickname);
            updateNickNames();
        }
    });

    function updateNickNames(){
        io.sockets.emit('usernames', nicknames);
    }

    socket.on('send message', function(data){
       io.sockets.emit('new message', {msg: data, nick: socket.nickname});
   });

    socket.on('disconnect', function(data){
        if(!socket.nickname) return;
        nicknames.splice(nicknames.indexOf(socket.nickname), 1);
        updateNickNames();
    });
});