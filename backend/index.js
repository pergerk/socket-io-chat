var express = require("express");
var http = require("http");

var app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

var server = http.createServer(app);
server.listen(3000, () => console.log("listening port 3000"));
