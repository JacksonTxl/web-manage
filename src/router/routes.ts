import { StRouteConfig } from '@/types'
import { createRoutesFromStRoutes } from './generate'
import { authService } from '@/services/auth.service'
import { userService } from '@/services/user.service'
import { sidebarService } from '@/services/sidebar.service'
import { tabService } from '@/services/tab.service'
import { queryService } from '@/services/query.service'
import pageRoutes from './page-routes'

const stRoutes: StRouteConfig[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  ...pageRoutes,
  {
    path: '*',
    redirect: '404'
  }
]

export const routes = createRoutesFromStRoutes(stRoutes, route => {
  route.guards = route.guards || []
  route.meta = route.meta || {}

  route.guards.unshift(queryService)
  if (
    route.path.startsWith('/') &&
    route.name !== 'user-login' &&
    route.name !== '404'
  ) {
    route.guards.unshift(authService, userService, sidebarService, tabService)
  }

  switch (route.name) {
    case 'dashboard':
      route.meta.queryOptions = {
        a: { type: Number, default: 99 }
      }
      break
    default:
      break
  }
})
