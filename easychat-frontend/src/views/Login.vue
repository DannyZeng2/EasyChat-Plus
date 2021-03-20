<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Danny Zeng
 * @Date: 2021-03-16 23:29:33
 * @LastEditors: Danny Zeng
 * @LastEditTime: 2021-03-18 21:17:11
-->
<template>
  <div id="login-main">
    <div id="login-container">
      <span id="logo-name">Easychat<sup>&#174;</sup></span>

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
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            this.toChat()
        } else {
          return false;
        }
      });
    },

    toChat() {
      let _this = this
      let params = {username: this.loginForm.username, password: this.loginForm.password}
      this.$axios.get('/api/login', {params:params})
          .then(function (res) {
            if(res.data.success){
              _this.$router.push('/chat')
            }else {
              _this.$message.error(res.data.message);
            }
          })
          .catch(function (err) {
            console.log(err);
          });
    },


    register(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.registerUser()
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },

    registerUser() {
      let _this = this
      let params = {username: this.registerForm.username, password: this.registerForm.password, phone:this.registerForm.phone}
      this.$axios.post('/api/register', null,{params:params})
          .then(function (res) {
            if(res.data.success){
              _this.$message.success(res.data.message);
            }else {
              _this.$message.error(res.data.message);
            }
          })
          .catch(function (err) {
            console.log(err);
          });
    },


  }
}
</script>

<style scoped>
@import "../style/login.scss";
</style>
