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


      <el-container id="main-content">
        <el-aside style="width: 80px;">
          <el-menu :default-active="activeIndex" class="left-menu"  @select="handleSelect" background-color="#1d3e6d">
            <div id="photo"><el-avatar :size="60" :src="require('../assets/dog.jpeg')" style="margin: 10px"></el-avatar></div>
            <el-menu-item index="1"> <i class="el-icon-s-comment"></i></el-menu-item>
            <el-menu-item index="2"> <i class="el-icon-user-solid"></i></el-menu-item>
            <el-menu-item index="3"> <i class="el-icon-s-tools"></i></el-menu-item>
          </el-menu>
        </el-aside>

        <el-aside>
          <el-menu id="user-list" :default-active="1" class="main-menu" background-color="#e8e8e8" >
            <div id="user-list-title"></div>
            <el-divider></el-divider>
            <el-menu-item index="1">
              <el-avatar shape="square" :size="50" :src="require('../assets/cat.jpeg')"></el-avatar>
              <span class="chat-member">Danny Zeng</span>
            </el-menu-item>
            <el-menu-item index="2">
              <el-avatar shape="square" :size="50" :src="require('../assets/pig.jpeg')"></el-avatar>
              <span class="chat-member">Eric Chen</span>
            </el-menu-item>
            <el-menu-item index="3">
              <el-avatar shape="square" :size="50" :src="require('../assets/rabbit.jpeg')"></el-avatar>
              <span class="chat-member">Matthew Li</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-container>
          <el-header id="chat-title" height="60px"></el-header>
          <el-divider></el-divider>
          <el-main id="chat-content"><div id="content"></div></el-main>
          <el-footer id="tool-field" height="5%">
            <i class="el-icon-picture-outline" ></i>
            <i class="el-icon-video-camera"></i>
            <i class="el-icon-folder-add"></i>
          </el-footer>
          <el-footer id="input-field" height="20%">
            <textarea id='input' style="width: 95%;height: 100% " v-model="input"></textarea>
          </el-footer>
          <el-footer id="send-msg" height="50px"><el-button id="send-msg-btn" type="primary" @click="sendMsg" style="width: 12%">Send</el-button></el-footer>
          <div ></div>
          <div></div>
        </el-container>
      </el-container>
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
      message: '',
      activeIndex:1
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
@import "../style/chat.scss";

.el-icon-s-comment,.el-icon-user-solid,.el-icon-s-tools{
  font-size:200%;
  width: 40px
}

</style>
