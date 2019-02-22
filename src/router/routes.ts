import { StRouteConfig } from '@/types'
import { authService } from '@/services/auth.service'
import { userService } from '@/services/user.service'
import { createRoutesFromStRoutes } from './generate'
import generatedRoutes from './generated-routes'

const stRoutes: StRouteConfig[] = [
  ...generatedRoutes,
  {
    path: '*',
    redirect: '404'
  }
]

export const routes = createRoutesFromStRoutes(stRoutes)
