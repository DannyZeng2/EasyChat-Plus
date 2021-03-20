/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Danny Zeng
 * @Date: 2021-03-20 21:46:46
 * @LastEditors: Danny Zeng
 * @LastEditTime: 2021-03-20 22:13:28
 */
const ENTER = 0
const LEAVE = 1
const MESSAGE = 2

chat = (io) => {
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
}

module.exports = {
  chat
}

