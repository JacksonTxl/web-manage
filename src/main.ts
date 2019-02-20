import Vue from 'vue'
import App from './App.vue'
import { router } from './router/index'
import './plugins/ant-design-vue'
import './plugins/vue-rx'

const app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
