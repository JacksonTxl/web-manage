import {
  ServiceRoute,
  Inject,
  Injectable,
  ServiceRouter,
  Dictionary
} from 'vue-service-app'
import { AuthService } from './auth.service'
import { State, Computed } from 'rx-state/src'
import { map, pluck, first } from 'rxjs/operators'
import { NotificationService } from './notification.service'

interface RedirectConfig {
  /**
   * 当前路由名
   */
  locateRouteName: string
  /**
   * 需要跳转的下一级路由
   */
  redirectRouteName: string
  /**
   * to ServiceRoute 对象
   */
  to: ServiceRoute
  /**
   * next 函数
   */
  next: any
}

/**
 * 负责应用跳转 包含tab等
 */
@Injectable()
export class RedirectService {
  authedTabMap$ = new State<Dictionary<any>>({})
  constructor(
    private authService: AuthService,
    private router: ServiceRouter,
    private notification: NotificationService
  ) {}
  getAuthTabs$(routeName: string) {
    return new Computed(
      this.authedTabMap$.pipe(
        map(authMap => {
          if (!(routeName in authMap)) {
            this.notification.error({
              title: 'GET_AUTH_TABS_ERROR',
              content: `不存在 ${routeName} 下的tabs`
            })
          }
          return authMap[routeName]
        })
      )
    )
  }
  /**
   * 负责应用内的跳转服务
   * 包括 菜单跳转 tab跳转等
   */
  redirect(redirectConfig: RedirectConfig) {
    const { redirectRouteName, locateRouteName, to, next } = redirectConfig
    const resolveRoute = this.router.resolve({
      name: redirectRouteName
    })
    // 跳转路径为空
    if (!redirectRouteName) {
      this.notification.error({
        title: 'REDIRECT_ERROR',
        content: `未找到匹配路由 ${JSON.stringify(redirectRouteName)}`
      })
      return next()
    }
    if (to.name === locateRouteName) {
      // 检测路由表有该路由
      if (resolveRoute.route.matched.length) {
        next({
          name: redirectRouteName,
          query: {
            _f: Math.random()
              .toString(16)
              .slice(3)
          }
        })
      } else {
        this.notification.error({
          title: 'REDIRECT_ERROR',
          content: `未找到匹配路由 ${JSON.stringify(redirectRouteName)}`
        })
        next()
      }
    } else {
      next()
    }
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    const hasTabsRoutes = to.matched.filter(r => r.meta.tabs)
    if (!hasTabsRoutes.length) {
      return next()
    }
    hasTabsRoutes.forEach(r => {
      const tabRouteNames = r.meta.tabs as string[]
      const authedTabs = tabRouteNames.reduce(
        (res, routeName) => {
          const resolvedRoute = this.router.resolve({
            name: routeName
          })
          const meta = resolvedRoute.route.meta
          if (!meta) {
            return res.concat([])
          }
          // TODO 暂时使用常量返回true
          if (this.authService.tabCan(meta.auth)) {
            if (!meta.title) {
              console.error(
                `[auth.service] 请设置 ${routeName} 下的meta.title `
              )
            }
            return res.concat([
              {
                label: meta.title,
                route: {
                  name: resolvedRoute.route.name
                }
              }
            ])
          }
        },
        [] as any
      )
      this.authedTabMap$.commit(tabMap => {
        tabMap[r.name as string] = authedTabs
      })
    })

    // 父路由的跳转逻辑
    if (!to.meta.tabs) {
      return next()
    }
    const myAuthedTabs = this.authedTabMap$.snapshot()[to.name]

    if (!myAuthedTabs.length) {
      this.notification.error({
        title: 'REDIRECT_ERROR',
        content: `路由下没有tab可跳转 ${to.name}`
      })
      return next()
    }

    const firstRouteName = myAuthedTabs[0] ? myAuthedTabs[0].route.name : ''
    this.redirect({
      locateRouteName: to.name,
      redirectRouteName: firstRouteName,
      to,
      next
    })
  }
}
