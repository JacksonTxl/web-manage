import { ServiceRouteConfig } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'
import { NProgressService } from '@/services/nprogress.service'
import { HotReleaseService } from '@/services/hot-release.service'
import { UserService } from '@/services/user.service'
import { ThemeService } from '@/services/theme.service'
import pageRoutes from './auto-generated-routes'
import { TitleService } from '@/services/title.service'
import { RouteService } from '@/services/route.service'

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
    if (route.name === 'user-login') {
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
      prependGuards(route, [
        HotReleaseService,
        NProgressService,
        // AuthService,
        TitleService,
        UserService,
        RouteService
      ])
    }
    // 规范title i18n 名称
    if (route.name) {
      route.meta.title = `${route.name}.title`
    }

    route.meta.layout = 'default-brand'

    if (route.name.startsWith('shop')) {
      route.meta.layout = 'default-shop'
    }

    switch (route.name) {
      case 'user-login':
        route.meta.layout = 'login'
        break
      case '404':
        route.meta.layout = 'blank'
        break
      case 'test-zlx':
        route.meta.layout = 'blank'
        break
      case 'plugins-list':
        route.queryOptions = {
          a: { type: Number },
          b: { type: Number }
        }
        break
      default:
        break
    }

    if (route.children && route.children.length) {
      walkRoutes(route.children)
    }
  })
}

walkRoutes(routes)
console.log(routes)

export default routes
