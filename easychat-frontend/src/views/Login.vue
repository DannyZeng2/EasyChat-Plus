<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Danny Zeng
 * @Date: 2021-03-16 23:29:33
 * @LastEditors: Danny Zeng
 * @LastEditTime: 2021-03-16 23:48:06
-->
<template>
  <div class="login-container">
    <el-form label-position="left"
             label-width="0px"
             class="demo-ruleForm login-page">
      <el-form-item prop="username">
        <el-input type="text"
                  v-model="username"
                  placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  v-model="password"
                  placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary"
                   style="width:100%;"
                   @click="login">登录</el-button>
      </el-form-item>
    </el-form>
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
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
label.el-button.forget {
  margin: 0;
  padding: 0;
  border: 1px solid transparent;
  outline: none;
}
.login-container {
  margin: auto;
  width: 300px;
  height: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
#logo {
  width: 200px;
  padding-bottom: 15px;
  margin: 0 500px 0 55px;
}

.link {
  color: rgba(0, 0, 139, 0.9);
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
