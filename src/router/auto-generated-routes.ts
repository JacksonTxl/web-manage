/**
* this js file is auto generated, you should not modifyed this file
**/

import { DashboardService } from '@/views/pages/dashboard.service.ts'
import { ListService as BrandListService } from '@/views/pages/brand/list.service.ts'
import { StaffService as StaffStaffService } from '@/views/pages/staff/staff.service.ts'
import { LlfService as TestLlfService } from '@/views/pages/test/llf.service.ts'
import { ZlxService as TestZlxService } from '@/views/pages/test/zlx.service.ts'

const page404 = () => import('@/views/pages/404.vue')
const pageDashboard = () => import('@/views/pages/dashboard.vue')
const pageBrandDashboard = () => import('@/views/pages/brand/dashboard.vue')
const pageBrandList = () => import('@/views/pages/brand/list.vue')
const pageShopDashboard = () => import('@/views/pages/shop/dashboard.vue')
const pageStaffStaff = () => import('@/views/pages/staff/staff.vue')
const pageTestKael = () => import('@/views/pages/test/kael.vue')
const pageTestLlf = () => import('@/views/pages/test/llf.vue')
const pageTestMg20 = () => import('@/views/pages/test/mg20.vue')
const pageTestOss = () => import('@/views/pages/test/oss.vue')
const pageTestStyguide = () => import('@/views/pages/test/styguide.vue')
const pageTestZlx = () => import('@/views/pages/test/zlx.vue')
const pageTestZlxFull = () => import('@/views/pages/test/zlxFull.vue')
const pageUserLogin = () => import('@/views/pages/user/login.vue')
const pageUserRegister = () => import('@/views/pages/user/register.vue')

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
  guards: [DashboardService]
}, {
  name: 'brand-dashboard',
  path: '/brand/dashboard',
  component: pageBrandDashboard,
  guards: []
}, {
  name: 'brand-list',
  path: '/brand/list',
  component: pageBrandList,
  guards: [BrandListService]
}, {
  name: 'shop-dashboard',
  path: '/shop/dashboard',
  component: pageShopDashboard,
  guards: []
}, {
  name: 'staff-staff',
  path: '/staff/staff',
  component: pageStaffStaff,
  guards: [StaffStaffService]
}, {
  name: 'test-kael',
  path: '/test/kael',
  component: pageTestKael,
  guards: []
}, {
  name: 'test-llf',
  path: '/test/llf',
  component: pageTestLlf,
  guards: [TestLlfService]
}, {
  name: 'test-mg20',
  path: '/test/mg20',
  component: pageTestMg20,
  guards: []
}, {
  name: 'test-oss',
  path: '/test/oss',
  component: pageTestOss,
  guards: []
}, {
  name: 'test-styguide',
  path: '/test/styguide',
  component: pageTestStyguide,
  guards: []
}, {
  name: 'test-zlx',
  path: '/test/zlx',
  component: pageTestZlx,
  guards: [TestZlxService]
}, {
  name: 'test-zlxFull',
  path: '/test/zlxFull',
  component: pageTestZlxFull,
  guards: []
}, {
  name: 'user-login',
  path: '/user/login',
  component: pageUserLogin,
  guards: []
}, {
  name: 'user-register',
  path: '/user/register',
  component: pageUserRegister,
  guards: []
}]

export default pageRoutes
