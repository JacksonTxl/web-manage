import { parse } from '@/utils/webpack-key-path'

const pagesContext = require.context('../pages', true, /\.vue$/)
const pageServiceContext = require.context('../pages', true, /\.service\.ts$/)
const pageServiceKeys = pageServiceContext.keys()
const pagesKeys = pagesContext.keys()

const pageRoutes: any = []
const pageMap: any = {}

const serviceMap: any = {}

pageServiceKeys.forEach(keyPath => {
  const file = pageServiceContext(keyPath)
  const parsed = parse(keyPath)
  let exportedService = null
  Object.keys(file).forEach(name => {
    if (name.indexOf('Service') > -1 && typeof file[name] === 'object') {
      exportedService = file[name]
    }
  })
  if (!exportedService) {
    console &&
      console.warn(
        `file [pages/${parsed.entry}] has not export any service instance yet`
      )
    return
  }
  // @ts-ignore
  if (exportedService.beforeRouteEnter) {
    serviceMap[parsed.entry_dash.replace('.service', '')] = exportedService
  }
})

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
    beforeRouteEnter: serviceMap[parsed.entry_dash]
      ? [serviceMap[parsed.entry_dash]]
      : [],
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

export default pageRoutes
