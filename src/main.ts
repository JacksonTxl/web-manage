import '@abraham/reflection'
import Vue from 'vue'
import Antd from 'ant-design-vue'
import VueRx from 'vue-rx'
import routes from './router/routes'
import VueServiceApp from 'vue-service-app'
import { modalRouter } from './modal-router/index'
import App from './App.vue'
import { setup } from 'rx-state'
import { IS_DEV } from './constants/config'
import { debugService } from './services/debug.service'
import { localeService } from './services/locale.service'
import FullCalendar from 'vue-full-calendar'

import './style/app.less'
import { providers } from './providers'

import 'fullcalendar/dist/fullcalendar.min.css'

Vue.use(FullCalendar)

Vue.use(Antd)
Vue.use(VueRx)
Vue.use(VueServiceApp)

const { router } = new VueServiceApp({
  routes,
  providers
})

const app = new Vue({
  el: '#app',
  mounted() {},
  router,
  // @ts-ignore
  modalRouter,
  render: h => h(App)
})
