import { StRouteConfig } from '@/types'
import { createRoutesFromStRoutes } from './generate'
import generatedRoutes from './generated-routes'
import { authService } from '@/services/auth.service'
import { userService } from '@/services/user.service'

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
  if (guardRoute.name !== 'user.login') {
    if (!guardRoute.beforeRouteEnter) {
      guardRoute.beforeRouteEnter = []
    }
    guardRoute.beforeRouteEnter.unshift(authService, userService)
  }
  switch (guardRoute.name) {
    case 'plugins-course':
      break
    default:
      break
  }
})
