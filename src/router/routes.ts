import { authService } from '@/services/auth.service'
import { userService } from '@/services/user.service'
import { sidebarService } from '@/services/sidebar.service'
import { tabService } from '@/services/tab.service'
// @ts-ignore
// import pageRoutes from './generate-page-routes'
import { pageRoutes } from './other'
import { DEBUG_ROUTE, IS_DEV } from '@/constants/config'
import { nProgressService } from '@/services/nprogress.service'
import { ServiceRouteConfig } from 'vue-service-app'

// const routes: ServiceRouteConfig[] = [
//   {
//     path: '/',
//     redirect: '/dashboard'
//   },
//   ...pageRoutes,
//   {
//     path: '*',
//     redirect: '404'
//   }
// ]

// 根路由遍历
// routes.forEach(route => {
//   if (!route.guards) {
//     route.guards = []
//   }
//   const appendGuards = []
//   appendGuards.push(nProgressService)
//   if (route.name !== 'user-login' && route.name !== '404' && !route.redirect) {
//     appendGuards.push(tabService, sidebarService)
//   }
//   route.guards = [...appendGuards, ...route.guards]
//   switch (route.name) {
//     case 'dashboard':
//       break
//     default:
//       break
//   }
// })

const routes = pageRoutes

if (DEBUG_ROUTE && IS_DEV) {
  console.log('routes debug', routes)
}
export default routes
