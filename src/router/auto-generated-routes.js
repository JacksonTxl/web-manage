/**
* this js file is auto generated, you should not modifyed this file
**/

import { dashboardService } from '@/views/pages/dashboard.service.ts'
import { loginService } from '@/views/pages/user/login.service.ts'

const page404 = () => import('@/views/pages/404.vue')
const pageDashboard = () => import('@/views/pages/dashboard.vue')
const pageUserLogin = () => import('@/views/pages/user/login.vue')

// service
const pageRoutes = [{
  name: '404',
  path: '/404',
  component: page404,
  guards: []
}, {
  name: 'dashboard',
  path: '/dashboard',
  component: pageDashboard,
  guards: [dashboardService]
}, {
  name: 'user-login',
  path: '/user/login',
  component: pageUserLogin,
  guards: [loginService]
}
]

export default pageRoutes
