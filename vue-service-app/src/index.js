import { Container, Inject, InjectionToken, Injectable } from './di'
import multiguard from 'vue-router-multiguard'
import VueRouter from 'vue-router'

const isObject = s => typeof s === 'object' && s !== null
const isFn = s => typeof s === 'function'
const isString = s => typeof s === 'string'
/**
 * maybe it's an Ctor
 */
const isCtor = s => s.toString().indexOf('this') > -1

class ServiceRouter extends VueRouter {}

const syncRouteGuards = guards => (to, from) => {
  guards.forEach(fn => {
    fn(to, from)
  })
}

const rootContainer = new Container()
window.appContainer = rootContainer

let forceCount = 1
class VueServiceApp {
  static install(Vue) {
    Vue.use(VueRouter)
    Vue.mixin({
      beforeCreate() {
        const { serviceInject } = this.$options
        if (serviceInject) {
          if (!isFn(serviceInject)) {
            throw new Error(
              `[vue-service-app] serviceInject should be function but got ${typeof serviceInject}`
            )
          }
          const injects = serviceInject.call(this)
          if (!isObject(injects)) {
            throw new Error(
              `[vue-service-app] serviceInject should be function return an object but got ${typeof injects}`
            )
          }
          for (let name in injects) {
            if (injects[name] === undefined) {
              throw new Error(
                `[vue-service-app] serviceInject you just inject undefined in [${name}]`
              )
            }
            this[name] = rootContainer.get(injects[name])
          }
        }
      }
    })
  }
  constructor({
    base = '/',
    mode = 'history',
    routes = [],
    onError = e => {
      throw e
    },
    providers = []
  } = {}) {
    this.guardMap = {}
    this.queryMap = {}
    this.vueRouterOptions = {
      base,
      mode,
      routes
    }
    this.onError = onError
    this.router = null
    this.providers = providers
    this.isFirstRouter = true
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
          this.guardMap[route.name] = route.guards || []
        }
        if (route.queryOptions) {
          this.queryMap[route.name] = route.queryOptions || {}
        }
        if (route.children && route.children.length) {
          walkRoutes(route.children)
        }
      })
    }
    walkRoutes(this.vueRouterOptions.routes)

    this.router = new VueRouter(this.vueRouterOptions)
    const oriPush = this.router.push.bind(this.router)
    const self = this
    this.router.push = function(to, onComplete, onError) {
      if (isString(to)) {
        oriPush(to, onComplete, onError)
        return
      }
      if (!to.force) {
        oriPush(to, onComplete, onError)
        return
      }
      const oriHref = this.resolve(to).href
      to.query = to.query || {}
      to.query._f = forceCount++
      oriPush(
        to,
        () => {
          setTimeout(() => {
            window.history.replaceState(null, null, oriHref)
            onComplete && onComplete()
          })
        },
        onError
      )
    }
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
      // if (next.query._f) {
      //   delete next.query['_f']
      // }
      const queryOptions = this.queryMap[to.name]
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
  }
  beforeRouteEnterHandler() {
    this.router.beforeEach((to, from, next) => {
      if (to.name !== from.name) {
        const guardCtors = []
        to.matched.forEach(Comp => {
          guardCtors.push(...(this.guardMap[Comp.name] || []))
        })

        const guardPromises = guardCtors
          .filter(G => !!G)
          .map(G => {
            if (isCtor(G)) {
              return Promise.resolve(G)
            } else {
              return G()
            }
          })

        Promise.all(guardPromises)
          .then(Guards => {
            const guards = Guards.map(G => rootContainer.get(G))
            return guards
          })
          .then(guards => {
            const beforeFns = []
            guards.forEach(g => {
              if (g.beforeEach && typeof g.beforeEach === 'function') {
                beforeFns.push(g.beforeEach.bind(g))
              }
              if (
                g.beforeRouteEnter &&
                typeof g.beforeRouteEnter === 'function'
              ) {
                beforeFns.push(g.beforeRouteEnter.bind(g))
              }
            })
            const beforeMiddlewares = beforeFns.map(fn => {
              // maybe promise or subscribe,here transform to callback style
              if (fn.length < 3) {
                return (to, from, next) => {
                  const p = fn(to, from)
                  if (p.then) {
                    p.then(res => {
                      next(res && res.next)
                    }).catch(e => {
                      next(false)
                      this.onError(e)
                    })
                  }
                  if (p.subscribe) {
                    p.subscribe(
                      res => {
                        next(res && res.next)
                      },
                      e => {
                        next(false)
                        this.onError(e)
                      }
                    )
                  }
                }
              }
              return fn
            })
            return beforeMiddlewares
          })
          .then(beforeMiddlewares => {
            if (!beforeMiddlewares.length) {
              next()
            }
            multiguard(beforeMiddlewares)(to, from, next)
          })
      } else {
        return next()
      }
    })
  }
  beforeRouteUpdateHandler() {
    this.router.beforeEach((to, from, next) => {
      if (to.name === from.name) {
        const guardCtors = []
        to.matched.forEach(Comp => {
          guardCtors.push(...(this.guardMap[Comp.name] || []))
        })

        const guardPromises = guardCtors
          .filter(G => !!G)
          .map(G => {
            if (isCtor(G)) {
              return Promise.resolve(G)
            } else {
              return G()
            }
          })

        Promise.all(guardPromises)
          .then(Guards => {
            const guards = Guards.map(G => rootContainer.get(G))
            return guards
          })
          .then(guards => {
            const beforeFns = []
            guards.forEach(g => {
              if (g.beforeEach && typeof g.beforeEach === 'function') {
                beforeFns.push(g.beforeEach.bind(g))
              }
              if (
                g.beforeRouteUpdate &&
                typeof g.beforeRouteUpdate === 'function'
              ) {
                beforeFns.push(g.beforeRouteUpdate.bind(g))
              }
            })
            const beforeMiddlewares = beforeFns.map(fn => {
              // maybe promise or subscribe,here transform to callback style
              if (fn.length < 3) {
                return (to, from, next) => {
                  const p = fn(to, from)
                  if (p.then) {
                    p.then(res => {
                      next(res && res.next)
                    }).catch(e => {
                      next(false)
                      this.onError(e)
                    })
                  }
                  if (p.subscribe) {
                    p.subscribe(
                      res => {
                        next(res && res.next)
                      },
                      e => {
                        next(false)
                        this.onError(e)
                      }
                    )
                  }
                }
              }
              return fn
            })
            return beforeMiddlewares
          })
          .then(beforeMiddlewares => {
            if (!beforeMiddlewares.length) {
              next()
            }
            multiguard(beforeMiddlewares)(to, from, next)
          })
      } else {
        return next()
      }
    })
  }
  afterEachHandler() {
    this.router.afterEach((to, from) => {
      const guardCtors = []
      to.matched.forEach(Comp => {
        guardCtors.push(...(this.guardMap[Comp.name] || []))
      })
      const guards = guardCtors.filter(G => !!G).map(G => rootContainer.get(G))
      const afterEachMiddlewares = guards
        .filter(g => g.afterEach)
        .map(g => g.afterEach.bind(g))
      syncRouteGuards(afterEachMiddlewares)(to, from)
    })
  }
}

export { ServiceRouter, Inject, InjectionToken, Injectable }

export default VueServiceApp
