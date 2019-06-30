import Vue from 'vue'
import App from './App.vue'
import axios from './utils/axios'
import './plugins/element.js'
import router from './router'
import ElementUI from 'element-ui'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  ElementUI
}).$mount('#app')
