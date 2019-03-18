/**
* this js file is auto generated, you should not modifyed this file
**/

import { DashboardService } from '@/views/pages/dashboard.service.ts'
import { PluginsService } from '@/views/pages/plugins.service.ts'
import { ListService as PluginsListService } from '@/views/pages/plugins/list.service.ts'
import { ZlxService as TestZlxService } from '@/views/pages/test/zlx.service.ts'
import { RouterService as TestTestRouterRouterService } from '@/views/pages/test/testRouter/router.service.ts'
import { Router2Service as TestTestRouterRouter2Service } from '@/views/pages/test/testRouter/router2.service.ts'
import { ListService as TestTestRouterDeeprListService } from '@/views/pages/test/testRouter/deepr/list.service.ts'

const page404 = () => import('@/views/pages/404.vue')
const pageDashboard = () => import('@/views/pages/dashboard.vue')
const pagePlugins = () => import('@/views/pages/plugins.vue')
const pagePluginsList = () => import('@/views/pages/plugins/list.vue')
const pageTestLlf = () => import('@/views/pages/test/llf.vue')
const pageTestZlx = () => import('@/views/pages/test/zlx.vue')
const pageTestZlxFull = () => import('@/views/pages/test/zlxFull.vue')
const pageUserLogin = () => import('@/views/pages/user/login.vue')
const pageTestTestRouterRouter = () => import('@/views/pages/test/testRouter/router.vue')
const pageTestTestRouterRouter2 = () => import('@/views/pages/test/testRouter/router2.vue')
const pageTestTestRouterDeeprList = () => import('@/views/pages/test/testRouter/deepr/list.vue')
const pageTestTestRouterRouterA = () => import('@/views/pages/test/testRouter/router/a.vue')
const pageTestTestRouterRouterB = () => import('@/views/pages/test/testRouter/router/b.vue')
const pageTestTestRouterRouter2A = () => import('@/views/pages/test/testRouter/router2/a.vue')
const pageTestTestRouterRouter2C = () => import('@/views/pages/test/testRouter/router2/c.vue')
const pageTestTestRouterRouterAAsub = () => import('@/views/pages/test/testRouter/router/a/asub.vue')
const pageTestTestRouterRouterAAsub1 = () => import('@/views/pages/test/testRouter/router/a/asub1.vue')

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
  }]
}, {
  name: 'test-llf',
  path: '/test/llf',
  component: pageTestLlf,
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
  name: 'test-testRouter-router',
  path: '/test/testRouter/router',
  component: pageTestTestRouterRouter,
  guards: [TestTestRouterRouterService],
  children: [{
    name: 'test-testRouter-router-a',
    path: 'a',
    component: pageTestTestRouterRouterA,
    guards: [],
    children: [{
      name: 'test-testRouter-router-a-asub',
      path: 'asub',
      component: pageTestTestRouterRouterAAsub,
      guards: []
    }, {
      name: 'test-testRouter-router-a-asub1',
      path: 'asub1',
      component: pageTestTestRouterRouterAAsub1,
      guards: []
    }]
  }, {
    name: 'test-testRouter-router-b',
    path: 'b',
    component: pageTestTestRouterRouterB,
    guards: []
  }]
}, {
  name: 'test-testRouter-router2',
  path: '/test/testRouter/router2',
  component: pageTestTestRouterRouter2,
  guards: [TestTestRouterRouter2Service],
  children: [{
    name: 'test-testRouter-router2-a',
    path: 'a',
    component: pageTestTestRouterRouter2A,
    guards: []
  }, {
    name: 'test-testRouter-router2-c',
    path: 'c',
    component: pageTestTestRouterRouter2C,
    guards: []
  }]
}, {
  name: 'test-testRouter-deepr-list',
  path: '/test/testRouter/deepr/list',
  component: pageTestTestRouterDeeprList,
  guards: [TestTestRouterDeeprListService]
}]

export default pageRoutes
