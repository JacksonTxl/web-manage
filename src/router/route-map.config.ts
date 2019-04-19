import { ServiceRouteConfig } from 'vue-service-app'

interface RouteConfig extends ServiceRouteConfig {
  meta: {
    layout: string
    title: string
  }
}

export const routeMapConfig = {
  '404'(routeConfig: RouteConfig) {
    routeConfig.meta.layout = 'blank'
  },
  'user-login'(routeConfig: RouteConfig) {
    routeConfig.meta.layout = 'login'
  },
  'brand-setting-contract-list'(routeConfig: RouteConfig) {
    routeConfig.queryOptions = {
      a: {
        type: Number,
        default: '1'
      }
    }
  }
}
