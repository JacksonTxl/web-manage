import '@abraham/reflection'
import { router } from './bootstrap'
import Vue from 'vue'
import Antd from 'ant-design-vue'
import VueRx from 'vue-rx'
import { modalRouter } from './modal-router/index'
import App from './App.vue'
import FullCalendar from 'vue-full-calendar'
// 默认样式加载
import './style/index.less'
import './style/app.less'
import './components/register'
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
