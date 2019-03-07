import { ServiceRouteConfig } from 'vue-service-app'

import { nProgressService } from '@/services/nprogress.service'
import { authService } from '@/services/auth.service'
// @ts-ignore
import autoGeneratedRoutes from './auto-generated-routes'
import { forEach } from 'lodash-es'
import { userService } from '@/services/user.service'
import { tabService } from '@/services/tab.service'
import { titleService } from '@/services/title.service'
import { hotReleaseService } from '@/services/hot-release.service'

const routes: ServiceRouteConfig[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  ...autoGeneratedRoutes,
  {
    path: '*',
    redirect: '404'
  }
]

const walk = (
  routes: ServiceRouteConfig[],
  transformer: (route: ServiceRouteConfig) => void
) => {
  forEach(routes, route => {
    transformer(route)
    if (route.children && route.children.length) {
      walk(route.children, transformer)
    }
  })
}

walk(routes, route => {
  if (!route.meta) {
    route.meta = {
      layout: 'default',
      // this is i18n translate key
      title: `title.${route.name}`
    }
  }
  if (!route.guards) {
    route.guards = []
  }
  const unshiftGuards = []
  if (route.path.startsWith('/') && !route.redirect) {
    unshiftGuards.push(hotReleaseService, nProgressService, titleService)
  }
  if (
    route.path.startsWith('/') &&
    !route.redirect &&
    route.name !== 'user-login' &&
    route.name !== '404'
  ) {
    unshiftGuards.push(authService, tabService)
  }

  switch (route.name) {
    case 'user-login':
      route.meta.layout = 'login'
      break
    case '404':
      route.meta.layout = 'blank'
      break
    default:
      break
  }

  route.guards = [...unshiftGuards, ...route.guards]
})
console.log(routes)
export default routes
