var express = require('express');
var router = express.Router();
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);


router.get('/', function(req, res, next) {
  res.render('chat');
});

io.on('connection',function(socket){
  console.log('connected');
});

module.exports = router;