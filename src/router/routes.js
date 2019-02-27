
import dashboardService from '@/views/pages/dashboard.service.ts'
import pluginsService from '@/views/pages/plugins.service.ts'
import courseService from '@/views/pages/plugins/course.service.ts'
import loginService from '@/views/pages/user/login.service.ts'

const page404 = () => import('@/views/pages/404.vue')
const pageDashboard = () => import('@/views/pages/dashboard.vue')
const pagePlugins = () => import('@/views/pages/plugins.vue')
const pagePluginsCourse = () => import('@/views/pages/plugins/course.vue')
const pageUserLogin = () => import('@/views/pages/user/login.vue')

// service
const pageRoutes = [{
  name: '404',
  parent: '',
  path: '/404',
  component: page404,
  guards: []
}, {
  name: 'dashboard',
  parent: '',
  path: '/dashboard',
  component: pageDashboard,
  guards: [dashboardService]
}, {
  name: 'plugins',
  parent: '',
  path: '/plugins',
  component: pagePlugins,
  guards: [pluginsService],
  children: [{
    name: 'course',
    parent: 'plugins',
    path: '/plugins/course',
    component: pagePluginsCourse,
    guards: [courseService]
  }
  ]
}, {
  name: 'login',
  parent: '',
  path: '/user/login',
  component: pageUserLogin,
  guards: [loginService]
}
]
