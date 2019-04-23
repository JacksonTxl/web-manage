import { ServiceRouteConfig } from 'vue-service-app'

interface RouteConfig extends ServiceRouteConfig {
  meta: {
    layout: string
    title: string
  }
}
interface StaffEdit extends ServiceRouteConfig {
  staff_id?: number
  currentIndex?: number
}
export const routeMapConfig = {
  '404'(routeConfig: RouteConfig) {
    routeConfig.meta.layout = 'blank'
  },
  'user-login'(routeConfig: RouteConfig) {
    routeConfig.meta.layout = 'login'
  },
  styleguide(routeConfig: RouteConfig) {
    routeConfig.redirect = { name: 'styleguide-component' }
  },
  'test-llf-mine'(routeConfig: RouteConfig) {
    routeConfig.queryOptions = {
      courseName: { type: String, default: '-1' },
      b: { type: Number, default: 2 },
      c: { type: String, default: '3' },
      page: { type: Number, default: 1 },
      size: { type: Number, default: 20 }
    }
  }
}
