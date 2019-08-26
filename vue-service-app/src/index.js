import { Container, Inject, InjectionToken, Injectable } from './di'
import multiguard from 'vue-router-multiguard'
import { isCtor, isFn, last } from './utils'
import ServiceRouter from './router'
import VuePlugin from './vue-plugin'
import HistoryBF from './bf'

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
    this.queryOptionsHandler()
    this.beforeEachHandler()
    this.afterEachHandler()
  }
  initRouter() {
    // TODO: 可以去掉 直接配置在meta中即可
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

    this.router = new ServiceRouter(this.routerOptions, new HistoryBF())
  }
  /**
   * router Provider
   */
  initProvideRouter() {
    this.container.bindValue(ServiceRouter, this.router)
  }
  queryOptionsHandler() {
    this.router.beforeEach((to, from, next) => {
      console.log('beforeEach query')
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
  /**
   * 路由前置处理
   */
  beforeEachHandler() {
    this.router.beforeEach((to, from, next) => {
      const matched = to.matched
      if (!matched.length) {
        return next()
      }
      this._calcMiddlewaresByRoute(to, from).then(middlewares => {
        // 不要随意使用console.log 会使对象无法回收
        // console.log('middlewares', middlewares)
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
        if (g.beforeEach) {
          res.push(g.beforeEach.bind(g))
        }
        if (g[mode]) {
          res.push(g[mode].bind(g))
        }
        return res
      }, [])
  }
  _calcMiddlewaresByRoute(to, from) {
    const matched = to.matched
    const toLast = last(to.matched)
    const fromLast = last(from.matched)

    const myGuardPromises = (to.meta.guards || [])
      .filter(G => isFn(G) || isCtor(G))
      .map(G => (isCtor(G) ? Promise.resolve(G) : G()))

    const allGuardPromises = matched
      .reduce(
        (res, routeRecord) => res.concat(routeRecord.meta.guards || []),
        []
      )
      .filter(G => isFn(G) || isCtor(G))
      .map(G => (isCtor(G) ? Promise.resolve(G) : G()))

    return Promise.all(allGuardPromises)
      .then(preAllguards => {
        return Promise.all(myGuardPromises).then(myGuards => {
          return {
            allGuards: preAllguards,
            myGuards
          }
        })
      })
      .then(({ allGuards, myGuards }) => {
        if (to.name === from.name) {
          return this._getBeforeMiddlewaresByGuards(
            allGuards,
            'beforeRouteUpdate'
          )
        }
        if (to.name !== from.name) {
          // 父级是更新 自己是enter
          if (
            toLast &&
            fromLast &&
            toLast.parent &&
            fromLast.parent &&
            toLast.parent.name === fromLast.parent.name
          ) {
            // 所有父级执行beforeRouteUpdate
            const parentGuards = allGuards.slice(
              0,
              allGuards.length - myGuards.length
            )
            const parentMiddlewares = this._getBeforeMiddlewaresByGuards(
              parentGuards,
              'beforeRouteUpdate'
            )
            const myMiddlewares = this._getBeforeMiddlewaresByGuards(
              myGuards,
              'beforeRouteEnter'
            )

            return [...parentMiddlewares, ...myMiddlewares]
          } else {
            return this._getBeforeMiddlewaresByGuards(
              allGuards,
              'beforeRouteEnter'
            )
          }
        }
      })
  }

  _makeAsyncMiddlewares(middlewares) {
    return middlewares.map(fn => {
      /**
       * 含有next
       */
      if (fn.length > 2) {
        return (to, from, next) => {
          const ret = fn(to, from, next)
          if (ret && (ret.then || ret.subscribe)) {
            throw new Error(
              `[vue-service-app] can not use next() and (Promise or Observable) together -> ${
                fn.name
              }`
            )
          }
          return ret
        }
      }
      /**
       * Promise 或 Observable
       */
      return (to, from, next) => {
        const p = fn(to, from)
        if (!p) {
          return next()
        }
        if (p.then) {
          p.then(res => {
            next(res && res.next)
          }).catch(e => {
            console.error('[vue-service-app]', e)
            next()
          })
        }
        if (p.subscribe) {
          p.subscribe(
            res => {
              next(res && res.next)
            },
            e => {
              console.error('[vue-service-app]', e)
              next()
            }
          )
        }
      }
    })
  }
}

export { ServiceRouter, Inject, InjectionToken, Injectable, Container }

export default VueServiceApp
