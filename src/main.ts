import Vue from 'vue'
import Antd from 'ant-design-vue'
import VueRx from 'vue-rx'
import { router } from './router/index'
import '@/layouts/register'
import App from './App.vue'

import 'ant-design-vue/dist/antd.less'

Vue.use(Antd)
Vue.use(VueRx)

const app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
