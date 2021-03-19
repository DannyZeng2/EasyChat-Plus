/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Danny Zeng
 * @Date: 2021-03-19 22:13:59
 * @LastEditors: Danny Zeng
 * @LastEditTime: 2021-03-19 22:32:33
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var server = http.createServer(app);
const socketIO = require('socket.io')
const io = socketIO(server, {
  cors: {
    origin: '*'
  }
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const ENTER = 0
const LEAVE = 1
const MESSAGE = 2


let count = 0

io.on('connection', socket => {
  console.log('user connected')
  count++
  let user = `用户${count}`

  io.sockets.emit('broadcast_msg',
    {
      type: ENTER,
      msg: `${user}加入群聊`,
      time: new Date().toLocaleString()
    }
  )

  socket.on('send_msg', (data) => {
    console.log(`收到客户端的消息：${data}`)
    io.sockets.emit('broadcast_msg', {
      type: MESSAGE,
      msg: `${user}:${data}`,
      time: new Date().toLocaleString()
    })
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
    io.sockets.emit('broadcast_msg', {
      type: LEAVE,
      msg: `${user}离开了群聊`,
      time: new Date().toLocaleString()
    })
    count--
  });
});


server.listen('3000');

