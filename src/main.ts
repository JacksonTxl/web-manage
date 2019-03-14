import '@abraham/reflection'
import { router } from './bootstrap'
import Vue from 'vue'
import Antd from 'ant-design-vue'
import VueRx from 'vue-rx'
import { modalRouter } from './modal-router/index'
import App from './App.vue'
import './style/app.less'

Vue.use(Antd)
Vue.use(VueRx)

const viewApp = new Vue({
  el: '#app',
  mounted() {},
  router,
  // @ts-ignore
  modalRouter,
  render: h => h(App)
})
