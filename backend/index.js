var express = require("express");
var http = require("http");
var db = require('./db');
var path= require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));




var server = http.createServer(app);
require('./chat-io')(server);
server.listen(3000, () => console.log("listening port 3000"));
