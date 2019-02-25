import Vue from 'vue'
import Antd from 'ant-design-vue'
import VueRx from 'vue-rx'
import { router } from './router/index'
// @ts-ignore
import App from './App.vue'
import './layouts/register'

import 'ant-design-vue/dist/antd.less'
import { Subject, BehaviorSubject } from 'rxjs'

Vue.use(Antd)
Vue.use(VueRx)

const app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
