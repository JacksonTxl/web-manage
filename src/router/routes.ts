import { authService } from '@/services/auth.service'
import { userService } from '@/services/user.service'
import { sidebarService } from '@/services/sidebar.service'
import { tabService } from '@/services/tab.service'
import pageRoutes from './page-routes'
import { DEBUG_ROUTE } from '@/constants/config'
import { nProgressService } from '@/services/nprogress.service'
import { ServiceRouteConfig } from 'vue-service-app'

const routes: ServiceRouteConfig[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  ...pageRoutes,
  {
    path: '*',
    redirect: '404'
  }
]

// 根路由遍历
routes.forEach(route => {
  if (!route.guards) {
    route.guards = []
  }
  const appendGuards = []
  appendGuards.push(nProgressService)
  if (route.name !== 'user-login' && route.name !== '404' && !route.redirect) {
    appendGuards.push(authService, userService, tabService, sidebarService)
  }
  route.guards = [...appendGuards, ...route.guards]
  switch (route.name) {
    case 'dashboard':
      break
    default:
      break
  }
})

if (DEBUG_ROUTE) {
  console.log(routes)
}
export default routes
