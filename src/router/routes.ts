import { ServiceRouteConfig } from 'vue-service-app'
import pageRoutes from './auto-generated-routes'
import { routeMapConfig } from './route-map.config'

import { AppTokenGuard } from '@/guards/app-token.guard'
import { AppInfoGuard } from '@/guards/app-info.gurad.'
import { ProgressGuard } from '@/guards/progress.guard'
import { AppTabRedirectGuard } from '@/guards/app-tab-redirect.guard'
import { UdeskGuard } from '@/guards/udesk.guard'
import { AppTitleGuard } from '@/guards/app-title.guard'
import { TrackGuard } from '@/guards/track.guard'

const routes: any[] = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/brand/product/card/deposit-card/shop-sale-list',
    redirect: '/brand/product/card/deposit-card/shop-sale-list/brand'
  },
  ...pageRoutes
]

const prependGuards = (route: ServiceRouteConfig, guards: any[]) => {
  if (!route.guards) {
    route.guards = []
  }
  route.guards = [...guards, ...route.guards]
}

const walkRoutes = (routes: ServiceRouteConfig[]) => {
  routes.forEach(route => {
    if (!route.meta) {
      route.meta = {}
    }
    if (!route.name) {
      route.name = ''
    }

    // guards 配置
    if (
      route.name.startsWith('test') ||
      route.name.startsWith('styleguide') ||
      route.name.startsWith('welcome')
    ) {
      route.guards = [ProgressGuard, AppTitleGuard]
    } else if (route.path.startsWith('/') && !route.redirect) {
      const appGuards: any[] = [
        ProgressGuard,
        TrackGuard,
        AppTokenGuard,
        AppInfoGuard,
        AppTitleGuard,
        AppTabRedirectGuard,
        UdeskGuard
      ]
      route.guards = appGuards
    }
    // if (route.name) {
    //   route.meta.title = `${route.name}.title`
    // }
    route.meta.layout = 'default'

    // if (route.name.startsWith('shop')) {
    //   route.meta.layout = 'default-shop'
    // }

    if (route.name in routeMapConfig) {
      // @ts-ignore
      routeMapConfig[route.name](route)
    }

    if (route.children && route.children.length) {
      walkRoutes(route.children)
    }
  })
}

walkRoutes(routes)

export default routes
