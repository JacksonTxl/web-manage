
import { dashboardService } from '@/views/pages/dashboard.service.ts'
import { pluginsService } from '@/views/pages/plugins.service.ts'
import { courseService } from '@/views/pages/plugins/course.service.ts'
import { llfService } from '@/views/pages/test/llf.service.ts'
import { loginService } from '@/views/pages/user/login.service.ts'

const page404 = () => import('@/views/pages/404.vue')
const pageDashboard = () => import('@/views/pages/dashboard.vue')
const pagePlugins = () => import('@/views/pages/plugins.vue')
const pagePluginsCourse = () => import('@/views/pages/plugins/course.vue')
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
  name: 'plugins',
  path: '/plugins',
  component: pagePlugins,
  guards: [pluginsService],
  children: [{
    name: 'course',
    path: 'course',
    component: pagePluginsCourse,
    guards: [courseService]
  }
  ]
}, {
  name: 'llf',
  path: '/test/llf',
  component: pageTestLlf,
  guards: [llfService]
}, {
  name: 'zlx',
  path: '/test/zlx',
  component: pageTestZlx,
  guards: []
}, {
  name: 'login',
  path: '/user/login',
  component: pageUserLogin,
  guards: [loginService]
}
]
