import { Container, Inject, InjectionToken, Injectable } from './di'
import multiguard from 'vue-router-multiguard'
import { Hooks } from './hooks'
import VueRouter from 'vue-router'

const isObject = s => typeof s === 'object' && s !== null
const isFn = s => typeof s === 'function'
const isString = s => typeof s === 'string'

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
    onInit = [],
    providers = []
  } = {}) {
    this.guardMap = {}
    this.queryMap = {}
    this.onInit = onInit
    this.vueRouterOptions = {
      base,
      mode,
      routes
    }
    this.router = null
    this.providers = providers
    this.isFirstRouter = true
    // init
    this.initProviders()
    this.initAppInitHooks()
    this.initRouter()

    this.vueRouteInitNextFunction = null
    // router.beforeEach && router.afterEach
    this.routerInitHandler()
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
  initAppInitHooks() {
    const initMiddlewares = this.onInit
      .map(Init => rootContainer.get(Init))
      .filter(s => s.onInit)
      .map(s => {
        return s.onInit.bind(s)
      })

    const onInitLifeCycle = new Hooks().addHooks(initMiddlewares)
    onInitLifeCycle.run(() => {
      // 触发vueRouterInit行为
      this.vueRouteInitNextFunction && this.vueRouteInitNextFunction()
      this.isFirstRouter = false
    })
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

    this.router.push = function(to) {
      if (isString(to)) {
        oriPush(to)
        return
      }
      if (!to.force) {
        oriPush(to)
        return
      }
      const oriHref = this.resolve(to).href
      console.log(oriHref)
      to.query = to.query || {}
      to.query._f = forceCount++
      oriPush(to, () => {
        console.log('ok')
        // const oriState = window.history.state
        window.history.replaceState({}, null, oriHref)
      })
    }
    rootContainer.useProvider({
      provide: ServiceRouter,
      useValue: this.router
    })
  }
  routerInitHandler() {
    this.router.beforeEach((to, from, next) => {
      if (this.isFirstRouter) {
        this.vueRouteInitNextFunction = next
      } else {
        next()
      }
    })
  }
  queryOptionsHandler() {
    this.router.beforeEach((to, from, next) => {
      if (to.query._f) {
        delete to.query['_f']
      }
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
      const guardCtors = []
      to.matched.forEach(Comp => {
        guardCtors.push(...(this.guardMap[Comp.name] || []))
      })
      if (to.name !== from.name) {
        const guards = guardCtors
          .filter(G => !!G)
          .map(G => rootContainer.get(G))

        const beforeRouteEnterMiddlewares = []
        guards
          .filter(g => g.beforeEach || g.beforeRouteEnter)
          .forEach(g => {
            g.beforeEach &&
              beforeRouteEnterMiddlewares.push(g.beforeEach.bind(g))
            g.beforeRouteEnter &&
              beforeRouteEnterMiddlewares.push(g.beforeRouteEnter.bind(g))
          })

        if (!beforeRouteEnterMiddlewares.length) {
          return next()
        }
        return multiguard(beforeRouteEnterMiddlewares)(to, from, next)
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

        const guards = guardCtors
          .filter(G => !!G)
          .map(G => rootContainer.get(G))

        const beforeRouteUpdateMiddlewares = []
        guards
          .filter(g => g.beforeEach || g.beforeRouteUpdate)
          .forEach(g => {
            g.beforeEach &&
              beforeRouteUpdateMiddlewares.push(g.beforeEach.bind(g))
            g.beforeRouteUpdate &&
              beforeRouteUpdateMiddlewares.push(g.beforeRouteUpdate.bind(g))
          })
        if (!beforeRouteUpdateMiddlewares.length) {
          return next()
        }
        return multiguard(beforeRouteUpdateMiddlewares)(to, from, next)
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
