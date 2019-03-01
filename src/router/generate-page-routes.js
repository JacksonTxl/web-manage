
import { dashboardService } from 'src/views/pages/dashboard.service.ts'
import { pluginsService } from 'src/views/pages/plugins.service.ts'
import { courseService } from 'src/views/pages/plugins/course.service.ts'
import { llfService } from 'src/views/pages/test/llf.service.ts'
import { loginService } from 'src/views/pages/user/login.service.ts'

const pageCViewsPages404 = () => import('src/views/pages/404.vue')
const pageCViewsPagesDashboard = () => import('src/views/pages/dashboard.vue')
const pageCViewsPagesPlugins = () => import('src/views/pages/plugins.vue')
const pageCViewsPagesPluginsCourse = () => import('src/views/pages/plugins/course.vue')
const pageCViewsPagesTestLlf = () => import('src/views/pages/test/llf.vue')
const pageCViewsPagesTestZlx = () => import('src/views/pages/test/zlx.vue')
const pageCViewsPagesUserLogin = () => import('src/views/pages/user/login.vue')

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
  name: 'c-views-pages-plugins',
  path: '/c/views/pages/plugins',
  component: pageCViewsPagesPlugins,
  guards: [pluginsService],
  children: [{
    name: 'c-views-pages-plugins-course',
    path: 'course',
    component: pageCViewsPagesPluginsCourse,
    guards: [courseService]
  }
  ]
}, {
  name: 'c-views-pages-test-llf',
  path: '/c/views/pages/test/llf',
  component: pageCViewsPagesTestLlf,
  guards: [llfService]
}, {
  name: 'c-views-pages-test-zlx',
  path: '/c/views/pages/test/zlx',
  component: pageCViewsPagesTestZlx,
  guards: []
}, {
  name: 'c-views-pages-user-login',
  path: '/c/views/pages/user/login',
  component: pageCViewsPagesUserLogin,
  guards: [loginService]
}
]
