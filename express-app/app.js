var createError = require('http-errors');
var express = require('express');
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 7000;
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var after = require('./routes/after');
var anotherAfter = require('./routes/another_after');
var login = require('./routes/login');
var chat = require('./routes/chat');


var setUser = require('./setUser');
var setCookie = require('./setCookie');

app.get('/chat' , function(req, res){
  res.sendFile( __dirname + "/views/" + "chat.html" );
});

io.on('connection',function(socket){
  socket.on('message',function(msg){
      console.log('message: ' + msg);
      io.emit('message', msg);
  });
});

http.listen(PORT, function(){
 console.log('server listening. Port:' + PORT);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 3 * 24 * 60 * 1000,
    secure: false,
    // sameSite: 'strict'
  }
}));

app.use('/', setUser, indexRouter);
app.use('/users', usersRouter);
app.use('/login', login);
app.use('/after', setUser, after);
app.use('/another_after', setUser, anotherAfter);
app.use('/chat', chat);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

