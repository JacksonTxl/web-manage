import { StRouteConfig } from '@/types'
import multiguard from 'vue-router-multiguard'
export const createRoutesFromStRoutes = (guardRoutes: StRouteConfig[] = []) => {
  guardRoutes.forEach(route => {
    if (route.beforeEnter) {
      console.warn(
        'beforeEnter should not used in GuardRouteConfig,use canActivate instead'
      )
    }
    if (route.beforeRouteEnter) {
      const beforeEnterGuard = multiguard(
        route.beforeRouteEnter.map(ins => ins.beforeRouteEnter.bind(ins))
      )
      route.beforeEnter = beforeEnterGuard
    }
  })
  return guardRoutes
}
