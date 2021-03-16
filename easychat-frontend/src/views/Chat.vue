<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Danny Zeng
 * @Date: 2021-03-14 21:22:31
 * @LastEditors: Danny Zeng
 * @LastEditTime: 2021-03-16 20:32:17
-->
<template>
  <div class="main">
    <el-row>
      <el-col :span="16">
        <el-input id='input'
                  v-model="input"></el-input>
      </el-col>
      <el-col :span="8">
        <el-button type="primary"
                   @click="sendMsg">Send</el-button>
      </el-col>
    </el-row>
    <div id="content"></div>
  </div>
</template>
<script>
const ENTER = 0
const LEAVE = 1

export default {
  name: 'Chat',
  data() {
    return {
      input: '',
      content: '',
      message: ''
    }
  },

  sockets: {
    connect() {
      this.$message({
        message: '连接成功！！！',
        type: 'success'
      });

    },

    disconnect() {
      this.$message({
        message: '连接断开！！！',
        type: 'error'
      })
    },

    broadcast_msg(data) {
      var content = document.querySelector('#content')
      var div = document.createElement('div')
      div.innerText = `${data.msg} ---${data.time}`
      if (data.type === ENTER) {
        div.style.color = 'green'
      } else if (data.type === LEAVE) {
        div.style.color = 'red'
      } else {
        div.style.color = 'blue'
      }
      content.appendChild(div)
    }
  },

  methods: {
    sendMsg() {
      this.$socket.emit('send_msg', this.input)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  width: 500px;
}
#input {
  width: 10px;
}
#content {
  margin-top: 15px;
  text-align: left;
}
</style>
