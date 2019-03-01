/**
* this js file is auto generated, you should not modifyed this file
**/
import { dashboardService } from '@/views/pages/dashboard.service.ts'
import { llfService } from '@/views/pages/test/llf.service.ts'
import { loginService } from '@/views/pages/user/login.service.ts'

const page404 = () => import('@/views/pages/404.vue')
const pageDashboard = () => import('@/views/pages/dashboard.vue')
const pageTestLlf = () => import('@/views/pages/test/llf.vue')
const pageUserLogin = () => import('@/views/pages/user/login.vue')

// service
const pageRoutes = [{
  name: 'c-views-pages-404',
  path: '/c/views/pages/404',
  component: pageCViewsPages404,
  guards: []
}, {
  name: 'c-views-pages-dashboard',
  path: '/c/views/pages/dashboard',
  component: pageCViewsPagesDashboard,
  guards: [dashboardService]
}, {
  name: 'test-llf',
  path: '/test/llf',
  component: pageTestLlf,
  guards: [llfService]
}, {
  name: 'user-login',
  path: '/user/login',
  component: pageUserLogin,
  guards: [loginService]
}
]

export default pageRoutes
