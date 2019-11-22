import { Container, Inject, InjectionToken, Injectable } from './di'
import multiguard from 'vue-router-multiguard'
import { isCtor, isFn, last } from './utils'
import ServiceRouter from './router'
import VuePlugin from './vue-plugin'
import { plusHook } from 'vue-router-plus'
import createController from './controller-mixin'
import { isPlainObject } from 'lodash-es'

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
    this.resolveAllHooksHandler()
    this.guardsHandler()
    this.controllerHandler()
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
  resolveAllHooksHandler() {
    this.router.beforeEach((to, from, next) => {
      if (!to.matched.length) {
        return next()
      }
      const matched = to.matched
      const tasks = []

      matched.forEach(routeRecord => {
        // 路由守卫
        const Guards = routeRecord.meta.guards
        // 路由控制器
        const Controller = routeRecord.meta.controller
        // 路由组件
        const Component = routeRecord.components.default

        if (isCtor(Controller)) {
          routeRecord.Controller = Controller
        } else {
          if (isFn(Controller)) {
            tasks.push(
              Controller().then(Ctrl => {
                routeRecord.Controller = Ctrl
              })
            )
          }
        }

        if (isPlainObject(Component)) {
          routeRecord.Component = Component
        } else {
          if (isFn(Component)) {
            tasks.push(
              Component().then(Comp => {
                routeRecord.Component = Comp.default
              })
            )
          }
        }
        // resolve 异步 guards
        if (Guards && Guards.length) {
          const GuardsQueue = Guards.filter(G => isFn(G) || isCtor(G)).map(G =>
            isCtor(G) ? Promise.resolve(G) : G()
          )
          tasks.push(
            Promise.all(GuardsQueue).then(Gs => {
              routeRecord.Guards = Gs
            })
          )
        }
      })
      if (!tasks.length) {
        return next()
      }
      Promise.all(tasks).then(() => {
        next()
        // console.log(matched)
      })
    })
  }
  guardsHandler() {
    this.router.beforeEach((to, from, next) => {
      const matched = to.matched
      if (!matched) {
        return next()
      }
      // console.log('matched', matched)
      const guards = matched.reduce(
        (res, routeRecord) => res.concat(routeRecord.Guards || []),
        []
      )
      let middlewares = []
      // 同name -> 路由更新的钩子
      if (to.name === from.name) {
        middlewares = this._getBeforeMiddlewaresByGuards(
          guards,
          'beforeRouteUpdate'
        )
      }
      // 不同name -> guard的路由进入钩子
      if (to.name !== from.name) {
        middlewares = this._getBeforeMiddlewaresByGuards(
          guards,
          'beforeRouteEnter'
        )
      }

      if (!middlewares.length) {
        return next()
      }

      const plusMiddlewares = middlewares.map(fn => plusHook(fn))

      multiguard(plusMiddlewares)(to, from, next)
    })
  }
  controllerHandler() {
    this.router.beforeEach((to, from, next) => {
      if (this.isControllerMixied) {
        return next()
      }
      const matched = to.matched
      if (!matched.length) {
        return next()
      }
      matched
        .filter(routeRecord => routeRecord.Controller)
        .forEach(routeRecord => {
          if (routeRecord.isControllerMixed) {
            return
          }
          const Component = routeRecord.Component
          if (Component) {
            Component.mixins = Component.mixins || []
            const controllerMixin = createController(
              routeRecord.Controller,
              this.container
            )
            Component.mixins.unshift(controllerMixin)
            routeRecord.isControllerMixed = true
          }
        })
      return next()
    })
  }
  /**
   * 路由后置处理
   */
  afterEachHandler() {
    this.router.afterEach((to, from) => {
      const matched = to.matched
      if (!matched.length) {
        return
      }

      matched
        .reduce((res, routeRecord) => res.concat(routeRecord.Guards || []), [])
        .map(G => this.container.get(G))
        .filter(g => g.afterEach)
        .reduce((res, g) => res.concat([g.afterEach.bind(g)]), [])
        .forEach(fn => {
          fn(to, from)
        })
    })
  }
  /**
   * @param {Array<any>} Guards 路由构造函数
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
