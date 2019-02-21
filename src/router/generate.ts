import { StRouteConfig } from '@/types'
import multiguard from 'vue-router-multiguard'
import { parse } from '@/utils/webpack-key-path'

const pagesContext = require.context('../pages', true, /\.vue$/)
const pagesKeys = pagesContext.keys()

const pageRoutes: any = []
const pageMap: any = {}

pagesKeys.forEach(keyPath => {
  const file = pagesContext(keyPath)
  const component = file.default || file
  const parsed = parse(keyPath)
  const hasParent = !!pageMap[parsed.dir_dash]
  const redirect = component.redirect
  const route = {
    // custom/info/detail -> custom-info-detail
    name: parsed.entry_dash,
    parent: hasParent ? parsed.dir_dash : '',
    path: hasParent ? parsed.name : '/' + parsed.entry,
    component,
    redirect: undefined
  }
  pageMap[parsed.entry_dash] = route
  if (redirect) {
    route.redirect = redirect
  }
  if (hasParent) {
    const routeParent = pageMap[route.parent]
    routeParent.children = routeParent.children || []
    routeParent.children.push(route)
  }
  // 顶层路由节点
  if (!hasParent) {
    pageRoutes.push(route)
  }
})
export const createRoutesFromStRoutes = (guardRoutes: StRouteConfig[] = []) => {
  guardRoutes.forEach(route => {
    if (route.beforeEnter) {
      console.warn(
        'beforeEnter should not used in GuardRouteConfig,use canActivate instead'
      )
    }
    if (route.beforeRouteEnter) {
      const beforeEnterGuard = multiguard(
        route.beforeRouteEnter.map(ins => ins.beforeRouteEnter.bind(ins))
      )
      route.beforeEnter = beforeEnterGuard
    }
  })
  return guardRoutes
}
