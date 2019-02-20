import multiguard from 'vue-router-multiguard'
import LayoutLogin from '@/layouts/login.vue'
import LayoutDefault from '@/layouts/default.vue'
import { GuardRouteConfig } from '@/types/route'

import { authService } from '@/services/auth.service'
import { userService } from '@/services/user.service'

const guardRoutes: GuardRouteConfig[] = [
  {
    name: 'login',
    path: '/login',
    component: LayoutLogin
  },
  {
    name: 'app',
    path: '/',
    component: LayoutDefault,
    canActivate: [authService, userService]
  }
]

const makeGuardRouteConfig = (guardRoutes: GuardRouteConfig[] = []) => {
  guardRoutes.forEach(route => {
    if (route.beforeEnter) {
      console.warn(
        'beforeEnter should not used in GuardRouteConfig,use canActivate instead'
      )
    }
    if (route.canActivate) {
      const beforeEnterGuard = multiguard(
        route.canActivate.map(ins => ins.canActivate.bind(ins))
      )
      route.beforeEnter = beforeEnterGuard
    }
  })
  return guardRoutes
}

export const routes = makeGuardRouteConfig(guardRoutes)
