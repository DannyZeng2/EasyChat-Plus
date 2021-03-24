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
    <span id="user-info">当前用户: {{ this.currentUser }}</span>
    <el-container id="main-content">
      <el-aside style="width: 80px;">
        <el-menu :default-active="activeIndex" class="left-menu" @select="handleSelect" background-color="#1d3e6d">
          <div id="photo">
            <el-avatar :size="60" :src="require('../assets/dog.jpeg')" style="margin: 10px"></el-avatar>
          </div>
          <el-menu-item index="1"> <i class="el-icon-s-comment"></i></el-menu-item>
          <el-menu-item index="2"> <i class="el-icon-user-solid"></i></el-menu-item>
          <el-menu-item index="3"> <i class="el-icon-s-tools"></i></el-menu-item>
        </el-menu>
      </el-aside>

      <el-aside>
        <div id="user-list" :default-active="1" class="main-menu">
          <div id="user-list-title">用户列表</div>
          <el-divider></el-divider>
          <table border-spacing=0>
          <tr v-for="(item) in userList" :key = "item" class="user-detail" >
            <td style="width: 60px;padding: 0 5px 0 5px;"><el-avatar shape="square" :size="50" :src="require('../assets/dog.jpeg')" ></el-avatar></td>
            <td><div class="chat-member">{{ item }}</div></td>
          </tr>
          </table>
        </div>
      </el-aside>

      <el-container>
        <el-header id="chat-title">群聊({{ this.count }})</el-header>
        <el-divider></el-divider>
        <el-main id="chat-content">
          <div id="content">
            <div v-for="(item) in chatHistory" :key = "item">
              <div v-if="typeof item === 'string'">
                <div style='text-align:center;color:grey;margin-bottom: 20px'>{{item}}</div>
              </div>
              <div class="my-msg" v-else-if="item.username === currentUser">
                <div class="message-box">
                  <div class="my message">
                    <img class="avatar" src="../assets/dog.jpeg" alt="" />
                    <div class="content">
                      <div class="bubble"><div class="bubble_cont">{{item.input}}</div></div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="other-users-msg">
                <div class="message-box">
                  <div class="other message">
                    <img class="avatar" src="../assets/dog.jpeg" alt="" />
                    <div class="content">
                      <div class="nickname">{{item.username}}</div>
                      <div class="bubble"><div class="bubble_cont">{{item.input}}</div></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </el-main>
        <el-footer id="tool-field" height="5%">
          <el-popover placement="top-start" width="300" trigger="click" class="emoBox">
            <div class="emotionList">
              <a href="javascript:void(0);" @click="getEmoji(index)" v-for="(item,index) in faceList" :key="index" class="emotionItem">{{item}}</a>
            </div>
            <i class="el-icon-emoji"  slot="reference"></i>
          </el-popover>
          <label class="el-icon-picture-outline" for="file"></label>
          <input id="file" type="file" style="display: none;" @change="handleFile"/>
          <i class="el-icon-video-camera"></i>
          <i class="el-icon-folder-add">
          </i>
        </el-footer>
        <el-footer id="input-field" height="20%">
          <textarea id='input' style="width: 95%;height: 100% " v-model="input"></textarea>
        </el-footer>
        <el-footer id="send-msg" height="50px">
          <el-button id="send-msg-btn" type="primary" @click="sendMsg" style="width: 12%">Send</el-button>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
const appData = require("../static/emoji.json");
export default {
  name: 'Chat',
  data() {
    return {
      input: '',
      content: '',
      message: '',
      count:0,
      activeIndex: 1,
      userList:[],
      chatHistory:[],
      faceList: [],
      currentUser:this.$route.params.username
    }
  },
  mounted() {
    if(localStorage.getItem('chatHistory') ===null) {
      localStorage.setItem('chatHistory','')
    }else {
      this.chatHistory = JSON.parse(localStorage.getItem('chatHistory'))
    }
    for(let i in appData){
      this.faceList.push(appData[i].char);
    }
  },

  watch: {
    chatHistory() {
      this.$nextTick(() => {
        document.getElementById("content").scrollIntoView(false)
      })
    }
  },

  sockets: {
    connect() {

    },

    disconnect() {

    },

    user_enter(data) {
      this.chatHistory.push(data)
      localStorage.setItem('chatHistory',JSON.stringify(this.chatHistory))
    },
    user_leave(data){
      this.chatHistory.push(data)
      localStorage.setItem('chatHistory',JSON.stringify(this.chatHistory))

    },
    count_users(data) {
      this.count = data.length
      this.userList = data
    },
    broadcast_msg(data) {
      this.chatHistory.push(data)
      console.log(this.chatHistory)
      localStorage.setItem('chatHistory',JSON.stringify(this.chatHistory))
    },
//
// <div className="message-box">
//   <div className="other message">
//     <img className="avatar" src="../assets/dog.jpeg" alt=""/>
//     <div className="content">
//       <div className="nickname">{{item.username}}</div>
//       <div className="bubble">
//         <div className="bubble_cont">{{item.input}}</div>
//       </div>
//     </div>
//   </div>
// </div>
    receiveImage(data) {
      console.log('-------------image------------')
      let div = document.createElement("div");
      if(data.username === this.currentUser) {
        div.innerHTML =`
          <div class="message-box">
            <div class="my message">
              <img src="/img/dog.a1534186.jpeg" alt="" class="avatar">
              <div class="content">
                <div class="bubble" style="background-color: white !important;border-right-color: #fff !important;;">
                <img src="${data.img}">
                </div>
              </div>
            </div>
          </div>
        `
      }else{
        div.innerHTML =`
          <div class="message-box">
            <div class="other message">
             <img src="/img/dog.a1534186.jpeg" alt="" class="avatar">
              <div class="content">
                <div class="nickname">${data.username}</div>
                <div class="bubble">
                  <div class="bubble_cont">
                    <img src="${data.img}">
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
      }

      document.getElementById("content").append(div)
    }
  },

  methods: {
    sendMsg() {

      if(this.input.trim() === '') {
        return
      }
      console.log(this.input)
      this.$socket.emit('send_msg', {
        username: this.currentUser,
        input: this.input.trim()
      })

      this.input = ''
    },
    getEmoji(index){
      let selectionStart = document.getElementById('input').selectionStart;
      let start = this.input.substring(0,selectionStart)
      let end = this.input.substring(selectionStart+1)
      let emoji = this.faceList[index]

      this.input = start +emoji +end
    },
    handleFile(e) {
      const file = e.target.files[0]
      const reader = new FileReader() // 创建读取文件对象
      reader.readAsDataURL(file) // 发起异步请求，读取文件
      reader.onload = () => {
        // 文件读取完成后
        // 读取完成后，将结果赋值给img的src
        this.$socket.emit('sendImage', {
          username: this.currentUser,
          img: reader.result
        })
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../style/chat.scss";
@import "../style/chat-bubble.scss";

.el-icon-s-comment,
.el-icon-user-solid,
.el-icon-s-tools {
  font-size: 200%;
  width: 40px;
}

</style>
