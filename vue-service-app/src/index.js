import { Container, Inject, InjectionToken, Injectable } from './di'
import multiguard from 'vue-router-multiguard'
import { isCtor, isFn, last } from './utils'
import ServiceRouter from './router'
import VuePlugin from './vue-plugin'
import { plusHook } from 'vue-router-plus'
import createController from './controller-mixin'

class VueServiceApp {
  static install(Vue, container) {
    Vue.use(VuePlugin, container)
  }
  constructor({
    base = '/',
    mode = 'history',
    routes = [],
    scrollBehavior = () => {},
    container = null
  } = {}) {
    this.routerOptions = {
      base,
      mode,
      routes,
      scrollBehavior
    }
    /**
     * @type {Container}
     */
    this.container = container
    /**
     * @type {ServiceRouter}
     */
    this.router = null

    if (!this.container) {
      throw new Error('[vue-service-app] need container!')
    }
    // init
    this.initRouter()
    this.initProvideRouter()
    // router.beforeEach
    this.beforeEachGuardsHandler()
    this.beforeEachController()
    this.afterEachHandler()

    console.log('[vue-service-app]', this)
  }
  initRouter() {
    // TODO: 可以去掉 直接配置在meta中即可
    const walkRoutes = routes => {
      routes.forEach(route => {
        if (!route.meta) {
          route.meta = {}
        }
        if (route.guards) {
          route.meta.guards = route.guards || []
        }
        route.meta.controller = route.controller
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
  }
  /**
   * router Provider
   */
  initProvideRouter() {
    this.container.bindValue(ServiceRouter, this.router)
  }
  /**
   * 路由前置处理
   */
  beforeEachGuardsHandler() {
    this.router.beforeEach((to, from, next) => {
      const matched = to.matched
      if (!matched.length) {
        return next()
      }
      this._calcMiddlewaresByRoute(to, from).then(middlewares => {
        // 不要随意使用console.log 会使对象无法回收
        if (!middlewares) {
          return next()
        }
        if (!middlewares.length) {
          return next()
        }

        const mulitguardsMiddlewares = this._makeAsyncMiddlewares(middlewares)
        return multiguard(mulitguardsMiddlewares)(to, from, next)
      })
    })
  }
  beforeEachController() {}

  /**
   * 路由后置处理
   */
  afterEachHandler() {
    this.router.afterEach((to, from) => {
      const matched = to.matched
      if (!matched.length) {
        return
      }
      const allGuardPromises = matched
        .reduce(
          (res, routeRecord) => res.concat(routeRecord.meta.guards || []),
          []
        )
        .filter(G => isFn(G) || isCtor(G))
        .map(G => (isCtor(G) ? Promise.resolve(G) : G()))
      Promise.all(allGuardPromises).then(Guards => {
        Guards.map(G => this.container.get(G))
          .filter(g => g.afterEach)
          .reduce((res, g) => res.concat([g.afterEach.bind(g)]), [])
          .forEach(fn => {
            fn(to, from)
          })
      })
    })
  }
  /**
   * @param {Array<any>} Guards 路由构造函数或 Promise<Guard>
   * @param {string} mode beforeRouteEnter 或  beforeRouteUpdate
   */
  _getBeforeMiddlewaresByGuards(Guards, mode) {
    return Guards.map(G => this.container.get(G))
      .filter(g => g.beforeEach || g[mode])
      .reduce((res, g) => {
        // 加入beforeEach钩子
        if (g.beforeEach) {
          res.push(g.beforeEach.bind(g))
        }
        // 加入beforeRouteEnter 或 beforeRouteUpdate 钩子
        if (g[mode]) {
          res.push(g[mode].bind(g))
        }
        return res
      }, [])
  }
  _calcMiddlewaresByRoute(to, from) {
    const matched = to.matched

    // 路由guards
    const guardsPromises = matched
      .reduce(
        (res, routeRecord) => res.concat(routeRecord.meta.guards || []),
        []
      )
      .filter(G => isFn(G) || isCtor(G))
      .map(G => (isCtor(G) ? Promise.resolve(G) : G()))

    return Promise.all(guardsPromises).then(guards => {
      console.log(guards, 'guards')
      // 同name -> 路由更新
      if (to.name === from.name) {
        return this._getBeforeMiddlewaresByGuards(guards, 'beforeRouteUpdate')
      }
      if (to.name !== from.name) {
        return this._getBeforeMiddlewaresByGuards(guards, 'beforeRouteEnter')
      }
    })
  }

  _makeAsyncMiddlewares(middlewares) {
    return middlewares.map(fn => plusHook(fn))
  }
}

export {
  ServiceRouter,
  Inject,
  InjectionToken,
  Injectable,
  Container,
  createController
}

export default VueServiceApp
