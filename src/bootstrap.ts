import Vue from 'vue'
import VueServiceApp from 'vue-service-app'
import routes from '@/router/routes'
import { providers } from '@/providers'

Vue.use(VueServiceApp)

const { router } = new VueServiceApp({
  routes,
  providers
})

export { router }
