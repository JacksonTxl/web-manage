import '@abraham/reflection'
import Vue from 'vue'
import Antd from 'ant-design-vue'
import VueRx from 'vue-rx'
import routes from './router/routes'
import VueServiceApp from 'vue-service-app'
import { modalRouter } from './modal-router/index'
import App from './App.vue'
import './style/app.less'
import { providers } from './providers'

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
