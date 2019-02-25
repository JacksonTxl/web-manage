import Vue from 'vue'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import VueRouter from 'vue-router'
import { routeGuardsMap } from './route-guards-map'
import { routes } from './routes'
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
    const guard = routeGuardsMap.get(to.name || '')
    guard.beforeRouteEnterHandler(to, from, next)
  } else {
    const guard = routeGuardsMap.get(to.name || '')
    guard.beforeRouteUpdateHandler(to, from, next)
  }
})

router.afterEach(() => {
  nProgress.done()
})
