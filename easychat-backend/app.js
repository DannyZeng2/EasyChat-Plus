/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Danny Zeng
 * @Date: 2021-03-19 22:13:59
 * @LastEditors: Danny Zeng
 * @LastEditTime: 2021-03-19 22:32:33
 */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socketIO = require('socket.io')
const io = socketIO(server, {
  cors: {
    origin: '*'
  }
});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);



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

