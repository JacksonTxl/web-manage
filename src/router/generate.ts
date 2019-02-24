import { StRouteConfig } from '@/types'
import multiguard from 'vue-router-multiguard'

const appendEnterGuard = (
  routes: StRouteConfig[] = [],
  transformer?: (stRoute: StRouteConfig) => void
) => {
  routes.forEach(route => {
    if (!route.beforeRouteEnter) {
      route.beforeRouteEnter = []
    }
    if (!route.meta) {
      route.meta = {}
    }
    if (!route.meta.query) {
      route.meta.query = {}
    }
    if (route.beforeEnter) {
      console.warn(
        'beforeEnter should not used in StRouteConfig,use beforeRouteEnter instead'
      )
    }
    if (transformer && typeof transformer === 'function') {
      transformer(route)
    }
    if (route.beforeRouteEnter.length) {
      const beforeGuardFns = route.beforeRouteEnter.map(ins => {
        return ins.beforeRouteEnter.bind(ins)
      })
      const beforeEnter = multiguard(beforeGuardFns)
      route.beforeEnter = beforeEnter
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
  appendEnterGuard(guardRoutes, transformer)
  return guardRoutes
}
