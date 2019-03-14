import '@abraham/reflection'
import { router } from './bootstrap'
import Vue from 'vue'
import Antd from 'ant-design-vue'
import VueRx from 'vue-rx'
import { modalRouter } from './modal-router/index'
import App from './App.vue'
import { setup } from 'rx-state'
import { IS_DEV } from './constants/config'
import { debugService } from './services/debug.service'
import { localeService } from './services/locale.service'
import FullCalendar from 'vue-full-calendar'

import './style/app.less'

import 'fullcalendar/dist/fullcalendar.min.css'

Vue.use(FullCalendar)

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
