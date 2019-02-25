import { StRouteConfig } from '@/types'
import multiguard from 'vue-router-multiguard'
import { routeGuardsMap } from './route-guards-map'

const _updateRoutes = (
  routes: StRouteConfig[] = [],
  transformer?: (stRoute: StRouteConfig) => void
) => {
  routes.forEach(route => {
    if (!route.meta) {
      route.meta = {}
    }
    if (!route.meta.query) {
      route.meta.query = {}
    }
    if (!route.guards) {
      route.guards = []
    }

    if (transformer && typeof transformer === 'function') {
      transformer(route)
    }
    if (route.guards && route.guards.length) {
      const beforeEachMiddwares = route.guards
        .filter(s => s.beforeEach)
        .map(s => s.beforeEach.bind(s))
      const beforeRouteEnterMiddlewares = route.guards
        .filter(s => s.beforeRouteEnter)
        .map(s => s.beforeRouteEnter.bind(s))
      const beforeRouteUpdateMiddlewares = route.guards
        .filter(s => s.beforeRouteUpdate)
        .map(s => s.beforeRouteUpdate.bind(s))

      routeGuardsMap.set(route.name || '', {
        beforeRouteEnterHandler: multiguard([
          ...beforeEachMiddwares,
          ...beforeRouteEnterMiddlewares
        ]),
        beforeRouteUpdateHandler: multiguard([
          ...beforeEachMiddwares,
          ...beforeRouteUpdateMiddlewares
        ])
      })
    }
    if (route.children && route.children.length) {
      _updateRoutes(route.children, transformer)
    }
  })
  return routes
}

export const createRoutesFromStRoutes = (
  routes: StRouteConfig[] = [],
  transformer?: (stRoute: StRouteConfig) => void
) => {
  _updateRoutes(routes, transformer)
  return routes
}
