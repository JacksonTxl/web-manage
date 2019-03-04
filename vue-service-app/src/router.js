import VueRouter from 'vue-router'
import { routeGuardsMap, routeQueryOptionsMap } from './route-maps'
import multiguard from 'vue-router-multiguard'

const syncRouteGuards = guards => (to, from) => {
  guards.forEach(fn => {
    fn(to, from)
  })
}

export class Router {
  constructor(
    options = {
      routes: []
    }
  ) {
    this.updateRoutes(options.routes)

    this.router = new VueRouter({
      mode: 'history',
      base: options.base,
      routes: options.routes
    })

    this.router.beforeEach((to, from, next) => {
      const queryOptions = routeQueryOptionsMap.get(to.name)
      const formatedQuery = Object.assign({}, to.query)
      if (queryOptions) {
        for (let queryName in queryOptions) {
          const query = queryOptions[queryName]
          const queryType = query.type
          const queryDefaultValue = query.default
          if (queryName in to.query) {
            formatedQuery[queryName] = queryType(to.query[queryName])
          } else {
            formatedQuery[queryName] = queryDefaultValue
          }
        }
      }
      to.meta.query = formatedQuery
      next()
    })

    this.router.beforeEach((to, from, next) => {
      if (to.name !== from.name) {
        const matched = to.matched
        const allBeforeArray = matched
          .filter(Comp => routeGuardsMap.get(Comp.name))
          .map(Comp => routeGuardsMap.get(Comp.name).beforeRouteEnterHandler)
        multiguard(allBeforeArray)(to, from, next)
      } else {
        const matched = to.matched
        const allBeforeArray = matched
          .filter(Comp => routeGuardsMap.get(Comp.name))
          .map(Comp => routeGuardsMap.get(Comp.name).beforeRouteUpdateHandler)
        multiguard(allBeforeArray)(to, from, next)
      }
    })
    this.router.afterEach((to, from) => {
      const matched = to.matched
      const allAfterArray = matched
        .filter(Comp => routeGuardsMap.get(Comp.name))
        .map(Comp => routeGuardsMap.get(Comp.name).afterEachHandler)
      syncRouteGuards(allAfterArray)(to, from)
    })
  }
  updateRoutes(routes) {
    routes.forEach(route => {
      if (!route.meta) {
        route.meta = {}
      }
      if (!route.queryOptions) {
        route.queryOptions = {}
      }
      if (!route.meta.query) {
        route.meta.query = {}
      }
      if (!route.guards) {
        route.guards = []
      }
      // routeQueyrOptionsMap
      routeQueryOptionsMap.set(route.name, route.queryOptions)
      if (route.guards.length) {
        const beforeEachMiddwares = route.guards
          .filter(s => s && s.beforeEach)
          .map(s => s.beforeEach.bind(s))
        const beforeRouteEnterMiddlewares = route.guards
          .filter(s => s && s.beforeRouteEnter)
          .map(s => s.beforeRouteEnter.bind(s))
        const beforeRouteUpdateMiddlewares = route.guards
          .filter(s => s && s.beforeRouteUpdate)
          .map(s => s.beforeRouteUpdate.bind(s))

        const afterEachMiddlewares = route.guards
          .filter(s => s && s.afterEach)
          .map(s => s.afterEach.bind(s))

        routeGuardsMap.set(route.name, {
          beforeRouteEnterHandler: multiguard([
            ...beforeEachMiddwares,
            ...beforeRouteEnterMiddlewares
          ]),
          beforeRouteUpdateHandler: multiguard([
            ...beforeEachMiddwares,
            ...beforeRouteUpdateMiddlewares
          ]),
          afterEachHandler: syncRouteGuards(afterEachMiddlewares)
        })
      }
      if (route.children && route.children.length) {
        this.updateRoutes(route.children)
      }
    })
  }
}
