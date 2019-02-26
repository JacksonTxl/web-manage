import { StRouteConfig } from '@/types/route'
import { createRoutesFromStRoutes } from './generate'
import { authService } from '@/services/auth.service'
import { userService } from '@/services/user.service'
import { sidebarService } from '@/services/sidebar.service'
import { tabService } from '@/services/tab.service'
import { queryService } from '@/services/query.service'
import pageRoutes from './page-routes'
import { DEBUG_ROUTE } from '@/constants/config'

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

  if (
    route.path.startsWith('/') &&
    !route.redirect &&
    route.name !== 'user-login' &&
    route.name !== '404'
  ) {
    route.guards = [
      authService,
      userService,
      sidebarService,
      tabService,
      ...route.guards
    ]
  }
  // 参数normalize化
  if (route.path.startsWith('/') && !route.redirect) {
    route.guards = [queryService, ...route.guards]
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

// debug route
if (DEBUG_ROUTE) {
  console.log(routes)
}
