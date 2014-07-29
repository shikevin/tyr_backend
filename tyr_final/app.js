var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var io = require('socket.io').listen(server);

//var routes = require('./routes/index');
//
//app.use('/', routes);

var app = express();
var server = http.createServer(app);
server.listen(3000);

app.get('/', function(req,res){
    res.sendfile(__dirname + '/index.html')
});