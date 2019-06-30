import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index.js'
import Login from '@/views/Login'
import Main from '@/views/Main'

import ImportProject from '@/views/ImportProject' 
import DataReview from '@/views/DataReview' 
import ProjectMgt from '@/views/ProjectMgt' 

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        { path: '/ImportProject', name: 'ImportProject', component: ImportProject },
        { path: '/DataReview', name: 'DataReview', component: DataReview },
        { path: '/ProjectMgt', name: 'ProjectMgt', component: ProjectMgt },
      ]
    }, 
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   var token = store.state.token
//   if (token) {
//     // 已登录
//     if (to.path === '/login') {
//       next('/')
//     } else {
//       // 各种权限控制meta.xxx
//       next()
//     }
//   } else {
//     // 未登录
//     if (to.path === '/login') {
//       next()
//     } else if (store.state.isLoginPage) {
//       next('/login')
//     } else {
//       // next();
//     }
//   }
// })

// 刷新页面调取sessionStorage重新赋值vuex
if (window.sessionStorage.getItem('token')) {
  store.commit('setToken', window.sessionStorage.getItem('token'))
}

export default router