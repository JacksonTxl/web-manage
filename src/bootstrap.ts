import Vue from 'vue'
import VueServiceApp from 'vue-service-app'
import routes from '@/router/routes'
import { providers } from '@/providers'
import { ThemeService } from './services/theme.service'
Vue.use(VueServiceApp)

const { router } = new VueServiceApp({
  onInit: [ThemeService],
  routes,
  providers
})

export { router }
