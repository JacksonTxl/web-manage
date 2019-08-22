import Vue from 'vue'
import VueServiceApp from 'vue-service-app'
import routes from '@/router/routes'
import container from './container'

Vue.use(VueServiceApp, container)

const { router } = new VueServiceApp({
  container,
  routes,
  scrollBehavior: (to: any, from: any) => {
    if (to.name === from.name) {
      return
    }
    return {
      y: 0
    }
  }
})

export { router }
