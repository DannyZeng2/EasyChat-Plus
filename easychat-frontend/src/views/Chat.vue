<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Danny Zeng
 * @Date: 2021-03-14 21:22:31
 * @LastEditors: Danny Zeng
 * @LastEditTime: 2021-03-17 23:36:20
-->
<template>
  <div id="main">

    <div id="main-content">
      <el-container>
        <el-aside style="width: 80px;">
          <el-menu :default-active="activeIndex" class="left-menu"  @select="handleSelect" background-color="#1d3e6d">
            <div id="photo"><el-avatar :size="60" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="margin: 10px"></el-avatar></div>
            <el-menu-item index="1"> <i class="el-icon-s-comment" style="width: 40px"></i></el-menu-item>
            <el-menu-item index="2"> <i class="el-icon-user-solid" style="width: 40px"></i></el-menu-item>
            <el-menu-item index="3"> <i class="el-icon-s-tools" style="width: 40px"></i></el-menu-item>
          </el-menu>
        </el-aside>
        <el-aside>
          <el-menu :default-active="activeIndex" class="main-menu" background-color="#e8e8e8">
            <div id="user-list-title"></div>
            <el-divider></el-divider>
            <el-menu-item index="1"></el-menu-item>
            <el-menu-item index="2"></el-menu-item>
            <el-menu-item index="3"></el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header id="chat-title" height="60px"></el-header>
          <el-divider></el-divider>
          <el-main id="chat-content"><div id="content"></div></el-main>
          <el-footer id="tool-field" height="50px">
            <i class="el-icon-picture-outline" ></i>
            <i class="el-icon-video-camera"></i>
            <i class="el-icon-folder-add"></i>
          </el-footer>
          <el-footer id="input-field" height="360px">
            <textarea id='input' style="width: 95%;height: 100% " v-model="input"></textarea>
          </el-footer>
          <el-footer id="send-msg" height="50px"><el-button id="send-msg-btn" type="primary" @click="sendMsg" style="width: 8%">Send</el-button></el-footer>
          <div ></div>
          <div></div>
        </el-container>
      </el-container>
    </div>
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
      this.input = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#main {
  width: 100%;
  height: 100%;
  background: url("../assets/chat-bg2.jpg") no-repeat;
  background-position: center;
  background-size: cover;
  position: fixed;
}

#input {
  width: 10px;
}
#content {
  margin-top: 15px;
  text-align: left;
}

#main-content {
  background: white;
  width: 60%;
  height: 1200px;
  margin: auto;
  margin-top: 90px;
}

.left-menu {
  height:1200px;
}

.main-menu{
  height:1200px;
}


#user-list-title{
  height: 60px;
}
#chat-title{
  background: #f6f6f6;
}
#chat-content{
  width:100%;
  height: 500px;
  background: #f6f6f6;
}

.el-icon-s-comment,.el-icon-user-solid,.el-icon-s-tools{
  font-size:200%
}
.el-icon-picture-outline,.el-icon-video-camera,.el-icon-folder-add{
  font-size:220%;
  margin: 10px;
}

#send-msg{
  text-align: right;
}

.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 0;
}

textarea{
  margin-left: 20px;
  margin-top: 20px;
  border: none;
  resize: none;
  cursor: pointer;
  outline:none;
  font-size:30px
}



</style>
