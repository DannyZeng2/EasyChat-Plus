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
          <el-menu :default-active="activeIndex" class="main-menu" background-color="#D3D3D3">
            <div id="user-list"></div>
            <el-menu-item index="1"></el-menu-item>
            <el-menu-item index="2"></el-menu-item>
            <el-menu-item index="3"></el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header id="chat-title" height="80px"></el-header>
          <el-main id="chat-content"></el-main>
          <el-footer id="input-field" height="350px"></el-footer>
          <div ></div>
          <div></div>
        </el-container>
      </el-container>



<!--          <el-row>-->
<!--            <el-col :span="16">-->
<!--              <el-input id='input'-->
<!--                        v-model="input"></el-input>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <el-button type="primary"-->
<!--                         @click="sendMsg">Send</el-button>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--          <div id="content"></div>-->
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
  background: url("../assets/chat.jpeg") no-repeat;
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


#user-list,#photo{
  height: 80px;
}
#chat-title{
  background: #f6f6f6;
}
#chat-content{
  width:100%;
  height: 500px;
  background: #f6f6f6;
}

</style>
