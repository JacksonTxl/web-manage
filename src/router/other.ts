import { ServiceRouteConfig } from 'vue-service-app'
import LayoutDefault from '@/views/layouts/default.vue'
import Dashboard from '@/views/pages/dashboard.vue'
import NotFound from '@/views/pages/404.vue'
import Testllf from '@/views/pages/test/llf.vue'
import { tabService } from '@/services/tab.service'
import { dashboardService } from '@/views/pages/dashboard.service'
import { llfService } from '@/views/pages/test/llf.service'
import { nProgressService } from '@/services/nprogress.service'
import { authService } from '@/services/auth.service'
import { userService } from '@/services/user.service'
import { sidebarService } from '@/services/sidebar.service'
import UserLogin from '@/views/pages/user/login.vue'
import { loginService } from '@/views/pages/user/login.service'

export const pageRoutes: ServiceRouteConfig[] = [
  {
    name: 'user-login',
    path: '/user/login',
    guards: [nProgressService, loginService],
    component: UserLogin
  },
  {
    name: '404',
    path: '/404',
    guards: [nProgressService],
    component: NotFound
  },
  {
    path: '/',
    component: LayoutDefault,
    guards: [nProgressService, authService, tabService],
    children: [
      {
        path: '',
        redirect: 'dashboard'
      },
      {
        name: 'dashboard',
        path: 'dashboard',
        component: Dashboard,
        guards: [dashboardService]
      },
      {
        name: 'test-llf',
        path: 'test/llf',
        component: Testllf,
        guards: [llfService]
      }
    ]
  },
  {
    path: '*',
    redirect: '404'
  }
]
