var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');
var app = express();
var users = {};
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(3000);

var rooms = {};

//mongoose.connect('mongodb://localhost/chat', function(err){
//    if(err){
//        console.log(err);
//    } else {
//        console.log('Connected to mongodb!');
//    }
//});

//var chatSchema = mongoose.Schema({
//    //name: {first: String, last: String},
//    nick: String,
//    msg: String,
//    created: {type: Date, default: Date.now }
//});
//
//var Chat = mongoose.model('Message',  chatSchema); //an actual collection
//
//app.get('/', function(req,res){
//    res.sendfile(__dirname + '/index.html')
//});

app.use('/public', express.static(__dirname+'/public'));

app.get('/', function(req, res){
    res.sendfile(__dirname + '/tyr.html')
});

io.sockets.on('connection', function(socket){
//    var query = Chat.find({});
//    query.sort('-created').limit(8).exec(function(err,docs){
//        if(err) throw err;
//        socket.emit('load old msgs', docs);
//    });

    socket.on('join room', function(data, callback){
       if (data in rooms){
           socket.room = data;
           rooms[socket.room]++;
           callback("joined existing room: " + socket.room + " with: "
                + rooms[socket.room] + " connections");
       } else {
           socket.room = data;
           rooms[socket.room] = 1;
           callback("created new room: " + socket.room);
       }
    });

    socket.on('new user', function(data, callback){

    });
    
    socket.on('new location', function(data, callback){

    });

//    socket.on('new user', function(data, callback){
//        if(data in users){
//            callback(false);
//        } else {
//            callback(true);
//            socket.nickname = data;
//            users[socket.nickname] = socket;
//            updateNickNames();
//        }
//    });

//    function updateNickNames(){
//        io.sockets.emit('usernames', Object.keys(users));
//    }

//    socket.on('send message', function(data, callback){
//        var msg = data.trim();
//        if(msg.substr(0,3) ===  '/w '){
//            msg = msg.substr(3);
//            var ind = msg.indexOf(' ');
//            if (ind!== -1) {
//                var name = msg.substr(0, ind);
//                var msg = msg.substring(ind + 1);
//                if (name in users) {
//                    users[name].emit('whisper', {msg: msg, nick: socket.nickname})
//                } else {
//                    callback('Error: enter a valid user');
//                }
//            } else {
//                callback('Error: please enter a message for your whisper.');
//            }
//        } else {
//            //creating a new document (a collection has multiple documents) think table and row
//            var newMsg = new Chat({msg: msg, nick: socket.nickname});
//            newMsg.save(function(err){
//                if(err) throw err;
//                io.sockets.emit('new message', {msg: msg, nick: socket.nickname});
//            })
//        }
//    });

//    socket.on('disconnect', function(data){
//        if(!socket.nickname) return;
//        delete users[socket.nickname];
//        updateNickNames();
//    });
});