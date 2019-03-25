/**
* this js file is auto generated, you should not modifyed this file
**/

import { DashboardService } from '@/views/pages/dashboard.service.ts'
import { PluginsService } from '@/views/pages/plugins.service.ts'
import { ListService as BrandListService } from '@/views/pages/brand/list.service.ts'
import { ListService as PluginsListService } from '@/views/pages/plugins/list.service.ts'
import { LlfService as TestLlfService } from '@/views/pages/test/llf.service.ts'
import { ZlxService as TestZlxService } from '@/views/pages/test/zlx.service.ts'

const page404 = () => import('@/views/pages/404.vue')
const pageDashboard = () => import('@/views/pages/dashboard.vue')
const pagePlugins = () => import('@/views/pages/plugins.vue')
const pageBrandList = () => import('@/views/pages/brand/list.vue')
const pagePluginsList = () => import('@/views/pages/plugins/list.vue')
const pagePluginsTheme = () => import('@/views/pages/plugins/theme.vue')
const pageTestCheckbox = () => import('@/views/pages/test/checkbox.vue')
const pageTestLlf = () => import('@/views/pages/test/llf.vue')
const pageTestOss = () => import('@/views/pages/test/oss.vue')
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
  name: 'plugins',
  path: '/plugins',
  component: pagePlugins,
  guards: [PluginsService],
  children: [{
    name: 'plugins-list',
    path: 'list',
    component: pagePluginsList,
    guards: [PluginsListService]
  }, {
    name: 'plugins-theme',
    path: 'theme',
    component: pagePluginsTheme,
    guards: []
  }]
}, {
  name: 'brand-list',
  path: '/brand/list',
  component: pageBrandList,
  guards: [BrandListService]
}, {
  name: 'test-checkbox',
  path: '/test/checkbox',
  component: pageTestCheckbox,
  guards: []
}, {
  name: 'test-llf',
  path: '/test/llf',
  component: pageTestLlf,
  guards: [TestLlfService]
}, {
  name: 'test-oss',
  path: '/test/oss',
  component: pageTestOss,
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
