import Vue from 'vue'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import VueRouter from 'vue-router'
import { routeGuardsMap } from './route-guards-map'
import { routes } from './routes'
import multiguard from 'vue-router-multiguard'
Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  nProgress.start()
  return next()
})
/**
 * 实现路由中间件模式 使用route.guards 自动生成路由拦截
 *
 */
router.beforeEach((to, from, next) => {
  if (to.name !== from.name) {
    const matched = to.matched
    const allBeforeArray = matched.map(
      Comp => routeGuardsMap.get(Comp.name || '').beforeRouteEnterHandler
    )
    multiguard(allBeforeArray)(to, from, next)
  } else {
    const matched = to.matched
    const allBeforeArray = matched.map(
      Comp => routeGuardsMap.get(Comp.name || '').beforeRouteUpdateHandler
    )
    multiguard(allBeforeArray)(to, from, next)
  }
})

router.afterEach(() => {
  nProgress.done()
})
