import { RouteConfig } from 'vue-router'
import multiguard from 'vue-router-multiguard'
import LayoutLogin from '@/layouts/login.vue'
import LayoutDefault from '@/layouts/default.vue'

import { authService } from '@/services/auth.service'
import { userService } from '@/services/user.service'

export const routes: RouteConfig[] = [
  {
    name: 'login',
    path: '/login',
    component: LayoutLogin
  },
  {
    name: 'app',
    path: '/',
    component: LayoutDefault,
    beforeEnter: multiguard([
      authService.beforeEnter.bind(authService),
      userService.beforeEnter.bind(userService)
    ])
  }
]
