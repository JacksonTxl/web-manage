import { StRouteConfig } from '@/types'
import { authService } from '@/services/auth.service'
import { userService } from '@/services/user.service'
import { createRoutesFromStRoutes } from './generate'
import LayoutDefault from '@/layouts/default.vue'

const stRoutes: StRouteConfig[] = [
  {
    path: '/',
    component: LayoutDefault,
    beforeRouteEnter: [authService, userService],
    children: [
      {
        name: 'dashboard',
        path: 'dashboard',
        beforeRouteEnter: [],
        queryOptions: {
          a: { type: String, default: 3 }
        }
      }
    ]
  }
]

export const routes = createRoutesFromStRoutes(stRoutes)
