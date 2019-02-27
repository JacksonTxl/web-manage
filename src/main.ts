import Vue from 'vue'
import Antd from 'ant-design-vue'
import VueRx from 'vue-rx'
import router from './router/index'
import { modalRouter } from './modal-router/index'
// @ts-ignore
import App from './App.vue'
import './views/layouts/register'
import './style/app.less'
Vue.use(Antd)
Vue.use(VueRx)

const app = new Vue({
  el: '#app',
  router,
  // @ts-ignore
  modalRouter,
  render: h => h(App)
})
