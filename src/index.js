import VueRouter from 'vue-router'
export { Service } from './service'
export { Router } from './router'

export default {
  install(Vue) {
    Vue.use(VueRouter)
  }
}
