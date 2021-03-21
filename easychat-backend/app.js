/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Danny Zeng
 * @Date: 2021-03-19 22:13:59
 * @LastEditors: Danny Zeng
 * @LastEditTime: 2021-03-20 22:12:47
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
const ws = require('./controller/websocket_controller');

ws.chat(io)

const indexRouter = require('./routes/index');

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);



server.listen('3000',() =>{
  console.log('正在监听port:3000...')
});

