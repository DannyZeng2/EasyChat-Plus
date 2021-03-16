/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Danny Zeng
 * @Date: 2021-03-15 21:28:58
 * @LastEditors: Danny Zeng
 * @LastEditTime: 2021-03-16 00:05:02
 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueSocketIO from 'vue-socket.io';

import SocketIO from 'socket.io-client'


Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('ws://localhost:3000')
}))

new Vue({
  render: h => h(App),
}).$mount('#app')
