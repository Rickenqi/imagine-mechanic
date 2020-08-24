import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import qs from 'qs'

import axios from 'axios'
import store from './store'
axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = true
// 请求拦截，添加授权信息
axios.interceptors.request.use(config => {
  if (config.url !== '/login') {
    config.headers.Authorization = window.sessionStorage.getItem('token')
  }
  console.log(config)
  return config
})
Vue.prototype.$http = axios
Vue.prototype.$test = qs

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
