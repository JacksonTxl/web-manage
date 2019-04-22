import '@abraham/reflection'
import { router } from './bootstrap'
import Vue from 'vue'
import Antd from 'ant-design-vue'
import VueRx from 'vue-rx'

import { modalRouter } from './modal-router/index'
import App from './views/App.vue'
import FullCalendar from 'vue-full-calendar'
// @ts-ignore
import VueBemHelper from '@/vendor/vue-bem-helper'
// @ts-ignore
import VuerxState from '@/vendor/vue-rx-state'
import ICountUp from 'vue-countup-v2'
// @ts-ignore
import Viewer from 'v-viewer'
// 默认样式加载
import './style/index'
import './views/components/register'
// @ts-ignore
import Scrollbar from '@/vendor/vue-scrollbar'

Vue.use(Scrollbar)
Vue.use(VuerxState)
Vue.use(Antd)
Vue.use(VueRx)
Vue.use(FullCalendar)
Vue.use(Viewer)
Vue.use(VueBemHelper)

Vue.component(ICountUp.name, ICountUp)

const app = new Vue({
  el: '#app',
  router,
  // @ts-ignore
  modalRouter,
  render: h => h(App)
})

const deperated = (oldName: string, serviceName: string) => {
  return function() {
    console.warn(
      `this.$${oldName} is disabled,you should use serviceInject() to use ${serviceName} instead`
    )
  }
}

Object.defineProperty(Vue.prototype, '$notification', {
  value: {
    warn: deperated('notification.warn', 'notificationService'),
    info: deperated('notification.info', 'notificationService'),
    error: deperated('notification.error', 'notificationService'),
    warning: deperated('notification.warning', 'notificationService'),
    success: deperated('notification.success', 'notificationService')
  }
})

Object.defineProperty(Vue.prototype, '$message', {
  value: {
    warn: deperated('message.warn', 'messageService'),
    info: deperated('message.info', 'messageService'),
    error: deperated('message.error', 'messageService'),
    warning: deperated('message.warning', 'messageService'),
    success: deperated('message.success', 'messageService')
  }
})
