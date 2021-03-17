<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Danny Zeng
 * @Date: 2021-03-16 23:29:33
 * @LastEditors: Danny Zeng
 * @LastEditTime: 2021-03-18 00:55:27
-->
<template>
  <div id="main">
    <div id="login-container">
      <el-form>
        <el-form-item>
          <span>EasyChat</span>
        </el-form-item>
        <el-form-item class="info">
          <el-input type="text"
                    prefix-icon="el-icon-user"
                    v-model="username"
                    placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item class="info"
                      prop="password">
          <el-input type="password"
                    prefix-icon="el-icon-lock"
                    v-model="password"
                    placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item class="info">
          <el-button type="primary"
                     style="width:100%;"
                     @click="login"
                     round>登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      checked: true,
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      if (this.username === '' || this.password === '') {
        this.$alert("请输入账号和密码");
        return
      }
      this.$router.push('/chat')
    }
  }
}
</script>

<style scoped>
#main {
  background: url("../assets/login.jpg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
span {
  font: 500 100px "Comic Sans MS";
  color: white;
  text-shadow: 0 0 20px #fdec84, 10px -10px 30px #ffae35,
    20px -20px 40px #ec760c, -20px -60px 50px #cd4607, 0px -80px 60px #973717,
    10px -40px 70px #451b0e;
}

#login-container {
  margin: auto;
  width: 400px;
  padding: 80px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}
.info {
  width: 350px;
  left: 50%;
  margin-left: 30px;
}
#logo {
  width: 200px;
  padding-bottom: 15px;
  margin: 0 500px 0 55px;
}

#name {
  font-size: x-large;
  color: #409eff;
}
#user {
  font-size: x-large;
  color: #409eff;
}
</style>
