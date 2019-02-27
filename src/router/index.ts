import Vue from 'vue'
import VueServiceApp, { Router } from 'vue-service-app'
import routes from './routes'

Vue.use(VueServiceApp)

const { router } = new Router({
  routes
})

export default router
