/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Danny Zeng
 * @Date: 2021-03-20 21:46:46
 * @LastEditors: Danny Zeng
 * @LastEditTime: 2021-03-20 22:13:28
 */

chat = (io) => {
  let count = 0
  let users = []
  io.on('connection', socket => {
    console.log('user connected')
    count++
    let user = `用户${count}`

    socket.on('login', (data) => {

      console.log(`${data}加入了聊天室`)

      const user = users.find(item => item === data)
      if (user) {
        socket.emit('loginError')
      }else {
        users.push(data)
        console.log(users)
        io.sockets.emit('user_enter', `${data}加入了聊天室`)
        io.sockets.emit('count_users', users.length)
      }
    })

    socket.on('send_msg', (data) => {
      console.log(`收到客户端的消息：${data}`)
      io.sockets.emit('broadcast_msg', {
        msg: data,
        time: new Date().toLocaleString()
      })
    })

    socket.on('disconnect', () => {
      console.log('user disconnected')
        io.sockets.emit('user_leave', `${user}离开了群聊`)
    });
  });
}

module.exports = {
  chat
}

