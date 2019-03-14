import { ServiceRouteConfig } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'
import { NProgressService } from '@/services/nprogress.service'
import { HotReleaseService } from '@/services/hot-release.service'
import { DashboardService } from '@/views/pages/dashboard.service'
import { UserService } from '@/services/user.service'

const routes: ServiceRouteConfig[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    meta: {
      layout: 'default'
    },
    guards: [
      HotReleaseService,
      NProgressService,
      AuthService,
      UserService,
      DashboardService
    ],
    component: () => import('@/views/pages/dashboard.vue')
  },
  {
    name: 'user-login',
    path: '/user/login',
    guards: [HotReleaseService, NProgressService],
    meta: {
      layout: 'login'
    },
    component: () => import('@/views/pages/user/login.vue')
  },
  {
    name: '404',
    path: '/404',
    guards: [HotReleaseService, NProgressService],
    component: () => import('@/views/pages/404.vue')
  },
  {
    path: '*',
    redirect: '404'
  }
]

export default routes
