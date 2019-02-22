import { StRouteConfig } from '@/types'
import { createRoutesFromStRoutes } from './generate'
import generatedRoutes from './generated-routes'
import { authService } from '@/services/auth.service'
import { userService } from '@/services/user.service'
import { sidebarService } from '@/services/sidebar.service'

const stRoutes: StRouteConfig[] = [
  {
    path: '/',
    redirect: 'dashboard'
  },
  ...generatedRoutes,
  {
    path: '*',
    redirect: '404'
  }
]

export const routes = createRoutesFromStRoutes(stRoutes, guardRoute => {
  // 应用全局中间件
  if (
    // 只对根路由添加中间件
    guardRoute.path.startsWith('/') &&
    guardRoute.path !== '/' &&
    guardRoute.name !== 'user-login' &&
    guardRoute.name !== '404'
  ) {
    guardRoute.beforeRouteEnter.unshift(
      authService,
      userService,
      sidebarService
    )
  }
  switch (guardRoute.name) {
    case 'plugins-course':
      break
    default:
      break
  }
})
