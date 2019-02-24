import { StRouteConfig } from '@/types'
import { createRoutesFromStRoutes } from './generate'
import pages from './pages'
import { authService } from '@/services/auth.service'
import { userService } from '@/services/user.service'
import { sidebarService } from '@/services/sidebar.service'
import { tabService } from '@/services/tab.service'

const stRoutes: StRouteConfig[] = [
  {
    path: '/',
    redirect: 'dashboard'
  },
  ...pages,
  {
    path: '*',
    redirect: '404'
  }
]

export const routes = createRoutesFromStRoutes(stRoutes, route => {
  // 应用全局中间件
  if (
    // 只对根路由添加中间件
    route.path.startsWith('/') &&
    route.path !== '/' &&
    route.name !== 'user-login' &&
    route.name !== '404'
  ) {
    route.beforeRouteEnter.unshift(
      authService,
      userService,
      sidebarService,
      tabService
    )
  }
  switch (route.name) {
    case 'dashboard':
      route.meta.queryOptions = {
        a: {
          type: Number,
          default: 99
        }
      }
      break
    default:
      break
  }
})
