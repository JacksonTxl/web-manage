import '@abraham/reflection'
import { router } from './bootstrap'
import Vue from 'vue'
import Antd from 'ant-design-vue'
import VueRx from 'vue-rx'
import { modalRouter } from './modal-router/index'
import App from './App.vue'
import FullCalendar from 'vue-full-calendar'
// 默认样式加载
import './style/antd.less'
import './style/app.less'

Vue.use(Antd)
Vue.use(VueRx)
Vue.use(FullCalendar)

const app = new Vue({
  el: '#app',
  router,
  // @ts-ignore
  modalRouter,
  render: h => h(App)
})
