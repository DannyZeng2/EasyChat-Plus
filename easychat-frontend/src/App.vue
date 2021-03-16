<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Danny Zeng
 * @Date: 2021-03-15 21:28:58
 * @LastEditors: Danny Zeng
 * @LastEditTime: 2021-03-15 21:31:56
-->
<template>
  <div id="app">
    <Chat msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import Chat from './views/Chat.vue'

export default {
  name: 'App',
  components: {
    Chat
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
