import Vue from 'vue'
import VueServiceApp from 'vue-service-app'
import routes from '@/router/routes'
import { providers } from '@/providers'
import nProgress from 'nprogress'

Vue.use(VueServiceApp)

const { router } = new VueServiceApp({
  routes,
  providers,
  onError(e) {
    nProgress.done()
    throw e
  },
  scrollBehavior: (to: any) => {
    if (to.name.includes('brand-stat')) {
      return
    }
    return {
      y: 0
    }
  }
})

export { router }
