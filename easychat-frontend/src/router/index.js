/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: Danny Zeng
 * @Date: 2021-03-16 23:21:50
 * @LastEditors: Danny Zeng
 * @LastEditTime: 2021-03-16 23:48:49
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Chat from '../views/Chat.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/chat/:username',
      name: 'Chat',
      component: Chat
    }
  ]
})
export default router