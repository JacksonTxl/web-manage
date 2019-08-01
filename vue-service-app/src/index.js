import { Container, Inject, InjectionToken, Injectable } from './di'
import multiguard from 'vue-router-multiguard'
import { isCtor, isFn, syncRouteGuards } from './utils'
import ServiceRouter from './router'
import VuePlugin from './vue-plugin'

const rootContainer = new Container()
window.getContainer = function() {
  return rootContainer
}

class VueServiceApp {
  static install(Vue) {
    Vue.use(VuePlugin, rootContainer)
  }
  constructor({
    base = '/',
    mode = 'history',
    routes = [],
    scrollBehavior = () => {},
    onError = e => {
      throw e
    },
    providers = []
  } = {}) {
    this.routerOptions = {
      base,
      mode,
      routes,
      scrollBehavior
    }
    this.onError = onError
    this.router = null
    this.providers = providers
    // init
    this.initProviders()
    this.initRouter()

    // router.beforeEach && router.afterEach
    this.queryOptionsHandler()
    this.beforeRouteEnterHandler()
    this.beforeRouteUpdateHandler()
    this.afterEachHandler()
  }
  initProviders() {
    if (this.providers && Array.isArray(this.providers)) {
      this.providers.forEach(p => {
        if (typeof p === 'function') {
          rootContainer.useProvider({ provide: p, useClass: p })
        }
        if (typeof p === 'object') {
          rootContainer.useProvider(p)
        }
      })
    }
  }
  initRouter() {
    const walkRoutes = routes => {
      routes.forEach(route => {
        if (route.guards) {
          route.meta.guards = route.guards
        }
        if (route.queryOptions) {
          route.meta.queryOptions = route.queryOptions
        }
        if (route.children && route.children.length) {
          walkRoutes(route.children)
        }
      })
    }
    walkRoutes(this.routerOptions.routes)

    this.router = new ServiceRouter(this.routerOptions)
    /**
     * router Provider
     */
    rootContainer.useProvider({
      provide: ServiceRouter,
      useValue: this.router
    })
  }
  queryOptionsHandler() {
    this.router.beforeEach((to, from, next) => {
      next.query = next.query || {}
      if (to.query._f) {
        delete to.query['_f']
      }
      const queryOptions = to.meta.queryOptions
      const formatedQuery = Object.assign({}, to.query)
      if (queryOptions) {
        for (let queryName in queryOptions) {
          const query = queryOptions[queryName]
          const queryType = query.type
          const queryDefaultValue = query.default
          if (queryName in to.query && formatedQuery[queryName] !== undefined) {
            formatedQuery[queryName] = queryType(to.query[queryName])
          } else {
            formatedQuery[queryName] = queryDefaultValue
          }
        }
      }
      to.meta.query = formatedQuery
      next()
    })
  }
  _getGuards(to) {
    const guardCtors = to.matched.reduce(
      (res, Comp) => res.concat(Comp.meta.guards || []),
      []
    )

    const GuardPromises = guardCtors
      .filter(G => {
        return isFn(G) || isCtor(G)
      })
      .map(G => (isCtor(G) ? Promise.resolve(G) : G()))

    return Promise.all(GuardPromises).then(Guards => {
      return Guards.map(G => rootContainer.get(G))
    })
  }
  _beforeHandler(mode, to, from, next) {
    this._getGuards(to)
      .then(guards => {
        const beforeFns = []
        guards.forEach(g => {
          if (g.beforeEach && isFn(g.beforeEach)) {
            const fn = g.beforeEach.bind(g)
            fn.__ctorName = g.constructor.name
            beforeFns.push(fn)
          }
          if (g[mode] && isFn(g[mode])) {
            const fn = g[mode].bind(g)
            fn.__ctorName = g.constructor.name
            beforeFns.push(fn)
          }
        })
        return beforeFns
      })
      .then(beforeFns => {
        return beforeFns.map(fn => {
          // maybe promise or subscribe,here transform to callback style
          if (fn.length < 3) {
            const asyncMiddleware = (to, from, next) => {
              const p = fn(to, from)
              if (!p) {
                console.error(
                  `[vue-service-app] return undefined on to [${to.name}]`,
                  fn
                )
              }
              if (p.then) {
                p.then(res => {
                  next(res && res.next)
                }).catch(e => {
                  next()
                  this.onError(e)
                })
              }
              if (p.subscribe) {
                p.subscribe(
                  res => {
                    next(res && res.next)
                  },
                  e => {
                    next()
                    this.onError(e)
                  }
                )
              }
            }
            return asyncMiddleware
          } else {
            const middleware = (to, from, next) => {
              const ret = fn(to, from, next)
              if (ret && (ret.then || ret.subscribe)) {
                throw new Error(
                  `[vue-service-app] can not use next() and (Promise or Observable) together ->  ${
                    fn.__ctorName
                  } ${mode} hook`
                )
              }
              return ret
            }
            // 添加next和流对象并存的错误逻辑
            return middleware
          }
        })
      })
      .then(beforeMiddlewares => {
        if (!beforeMiddlewares.length) {
          next()
        } else {
          multiguard(beforeMiddlewares)(to, from, next)
        }
      })
  }
  beforeRouteEnterHandler() {
    this.router.beforeEach((to, from, next) => {
      if (to.name !== from.name) {
        this._beforeHandler('beforeRouteEnter', to, from, next)
      } else {
        next()
      }
    })
  }
  beforeRouteUpdateHandler() {
    this.router.beforeEach((to, from, next) => {
      if (to.name === from.name) {
        this._beforeHandler('beforeRouteUpdate', to, from, next)
      } else {
        next()
      }
    })
  }
  afterEachHandler() {
    this.router.afterEach((to, from) => {
      this._getGuards(to).then(guards => {
        const afterEachMiddlewares = guards
          .filter(g => g.afterEach)
          .map(g => g.afterEach.bind(g))
        syncRouteGuards(afterEachMiddlewares)(to, from)
      })
    })
  }
}

export { ServiceRouter, Inject, InjectionToken, Injectable }

export default VueServiceApp
