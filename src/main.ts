import Vue from 'vue'
import Antd from 'ant-design-vue'
import VueRx from 'vue-rx'
import router from './router/index'
import { modalRouter } from './modal-router/index'
import App from './App.vue'
import './views/layouts/register'
import './style/app.less'
import { setup } from 'rx-state'
import { IS_DEV } from './constants/config'
import { debugService } from './services/debug.service'

Vue.use(Antd)
Vue.use(VueRx)

setup({
  debug: IS_DEV,
  onStateChange: (value, tag) => {
    debugService.stateEvent$.dispatch({ tag, value })
  }
})

const app = new Vue({
  el: '#app',
  router,
  // @ts-ignore
  modalRouter,
  render: h => h(App)
})
