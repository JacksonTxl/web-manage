import { ServiceRouteConfig } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'
import { NProgressService } from '@/services/nprogress.service'
import { HotReleaseService } from '@/services/hot-release.service'
import { UserService } from '@/services/user.service'
import pageRoutes from './auto-generated-routes'
import { TitleService } from '@/services/title.service'
import { RouteService } from '@/services/route.service'
import { LayoutBrandService } from '@/services/layouts/layout-brand.service'
import { LayoutShopService } from '@/services/layouts/layout-shop.service'
import { routeMapConfig } from './route-map.config'

const routes: any[] = [
  {
    path: '/',
    redirect: '/brand/'
  },
  {
    path: '/brand/',
    redirect: '/brand/dashboard'
  },
  {
    path: '/shop/',
    redirect: '/shop/dashboard'
  },
  {
    path: '/brand/product/card/deposite-card/shop-sale-list',
    redirect: '/brand/product/card/deposite-card/shop-sale-list/brand'
  },
  {
    path: '/brand/setting/app',
    redirect: '/brand/setting/app/course/category'
  },
  {
    path: '/brand/setting/general',
    redirect: '/brand/setting/general/brand'
  },
  {
    path: '/shop/reception/cabinet',
    redirect: '/shop/reception/cabinet/temporary'
  },
  ...pageRoutes,
  {
    path: '*',
    redirect: '404'
  }
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
    if (route.name === 'account-login') {
      prependGuards(route, [
        HotReleaseService,
        NProgressService,
        TitleService,
        RouteService
      ])
    } else if (route.name === '404') {
      prependGuards(route, [
        HotReleaseService,
        NProgressService,
        TitleService,
        RouteService
      ])
    } else if (route.path.startsWith('/') && !route.redirect) {
      const appGuards: any[] = [
        HotReleaseService,
        NProgressService,
        AuthService,
        TitleService,
        UserService,
        RouteService
      ]
      if (route.name.startsWith('brand')) {
        appGuards.push(LayoutBrandService)
      }
      if (route.name.startsWith('shop')) {
        appGuards.push(LayoutShopService)
      }
      prependGuards(route, appGuards)
    }
    // 规范title i18n 名称
    if (route.name) {
      route.meta.title = `${route.name}.title`
    }
    route.meta.layout = 'default-brand'

    if (route.name.startsWith('shop')) {
      route.meta.layout = 'default-shop'
    }

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
console.log('routes is ->', routes)

export default routes
