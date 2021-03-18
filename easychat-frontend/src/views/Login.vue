<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Danny Zeng
 * @Date: 2021-03-16 23:29:33
 * @LastEditors: Danny Zeng
 * @LastEditTime: 2021-03-18 21:17:11
-->
<template>
  <div id="main">
    <div id="login-container">


        <span>Easychat<sup>&#174;</sup></span>

      <el-tabs type="border-card" v-model="activeName" style="width: 440px;height: 380px;margin-top: 20px" :stretch=true>

        <el-tab-pane label="用户登录" name="login">
          <el-form :model="loginForm" :rules="rules" ref="loginForm">
            <el-form-item class="info" prop="username">
              <el-input type="text" prefix-icon="el-icon-user" v-model="loginForm.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item class="info" prop="password">
              <el-input type="password" prefix-icon="el-icon-lock" v-model="loginForm.password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item class="info">
              <el-checkbox v-model="checked">记住我</el-checkbox>
            </el-form-item>
            <el-form-item class="info">
              <el-button type="primary" style=" width:100%;" @click="login('loginForm')" round>登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="用户注册" name="register">
          <el-form :model="registerForm" :rules="rules" ref="registerForm">
            <el-form-item class="info" prop="username">
              <el-input type="text" prefix-icon="el-icon-user" v-model="registerForm.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item class="info" prop="password">
              <el-input type="password" prefix-icon="el-icon-lock" v-model="registerForm.password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item class="info" prop="phone">
              <el-input type="text" prefix-icon="el-icon-mobile-phone" v-model="registerForm.phone" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item class="info">
              <el-button type="primary" style=" width:100%;" @click="register('registerForm')" round>注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

      </el-tabs>

    </div>
  </div>

</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm:{
        username: '',
        password: '',
      },
      registerForm:{
        username: '',
        password: '',
        phone:''
      },
      checked: true,
      activeName: 'login',
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    login(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push('/chat')
          } else {
            console.log('error submit!!');
            return false;
          }
        });

    },
    register(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$router.push('/chat')
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    }

  }
}
</script>

<style scoped>
#main {
  background: url("../assets/background.jpeg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
span {
  margin-left: 35px;
  font: 800 80px "Sans-serif	";
  color: white;
}

#login-container {
  margin: auto;
  width: 400px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}
.info {
  width: 350px;
  left: 50%;
  margin-left: 30px;
  margin-top: 30px;
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
