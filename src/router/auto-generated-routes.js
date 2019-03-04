/**
* this js file is auto generated, you should not modifyed this file
**/

import { dashboardService } from '@/views/pages/dashboard.service.ts'
import { zlxService } from '@/views/pages/test/zlx.service.ts'

const page404 = () => import('@/views/pages/404.vue')
const pageDashboard = () => import('@/views/pages/dashboard.vue')
const pageTestLlf = () => import('@/views/pages/test/llf.vue')
const pageTestZlx = () => import('@/views/pages/test/zlx.vue')
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
  name: 'test-llf',
  path: '/test/llf',
  component: pageTestLlf,
  guards: []
}, {
  name: 'test-zlx',
  path: '/test/zlx',
  component: pageTestZlx,
  guards: [zlxService]
}, {
  name: 'user-login',
  path: '/user/login',
  component: pageUserLogin,
  guards: []
}]

export default pageRoutes
