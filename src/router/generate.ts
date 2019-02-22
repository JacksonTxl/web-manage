import { StRouteConfig } from '@/types'
import multiguard from 'vue-router-multiguard'

const appendEnterGuard = (routes: StRouteConfig[] = []) => {
  routes.forEach(route => {
    if (route.beforeEnter) {
      console.warn(
        'beforeEnter should not used in StRouteConfig,use beforeRouteEnter instead'
      )
    }
    if (route.beforeRouteEnter) {
      const beforeEnterGuard = multiguard(
        route.beforeRouteEnter.map(ins => {
          return ins.beforeRouteEnter.bind(ins)
        })
      )
      route.beforeEnter = beforeEnterGuard
      if (route.children && route.children.length) {
        appendEnterGuard(route.children)
      }
    }
  })
  return routes
}

export const createRoutesFromStRoutes = (
  guardRoutes: StRouteConfig[] = [],
  transformer?: (stRoute: StRouteConfig) => void
) => {
  if (transformer && typeof transformer === 'function') {
    guardRoutes.forEach(guardRoute => {
      transformer(guardRoute)
      if (guardRoute.children && guardRoute.children.length) {
        transformer(guardRoute)
      }
    })
  }

  appendEnterGuard(guardRoutes)
  return guardRoutes
}
