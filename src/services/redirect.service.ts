import {
  ServiceRoute,
  Injectable,
  ServiceRouter,
  Dictionary,
  RouteGuard
} from 'vue-service-app'
import { AuthService } from './auth.service'
import { State, Computed } from 'rx-state/src'
import { map } from 'rxjs/operators'
import { NotificationService } from './notification.service'
import { NProgressService } from './nprogress.service'
import { UserService } from './user.service'

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
   * 需要跳转路由的query
   *
   */
  redirectRouteQuery?: {
    [key: string]: any
  }
  /**
   * to ServiceRoute 对象
   */
  to: ServiceRoute
  /**
   * from 路由跳转的from对象
   */
  from: ServiceRoute
  /**
   * next 函数
   */
  next: any
}

/**
 * 负责应用跳转 包含tab等
 */
@Injectable()
export class RedirectService implements RouteGuard {
  authedTabMap$ = new State<Dictionary<any>>({})
  constructor(
    private authService: AuthService,
    private router: ServiceRouter,
    private notification: NotificationService,
    private nprogress: NProgressService,
    private userService: UserService
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
    const {
      redirectRouteName,
      locateRouteName,
      to,
      from,
      next,
      redirectRouteQuery
    } = redirectConfig
    const resolveRoute = this.router.resolve({
      name: redirectRouteName,
      query: {
        ...to.meta.query,
        ...redirectRouteQuery
      }
    })

    // 跳转路径为空
    if (!redirectRouteName) {
      this.nprogress.done()
      this.notification.error({
        title: 'REDIRECT_ROUTE_EMPTY',
        content: '跳转路由为空'
      })
      // 找不到redirectRouteName时跳转next()
      return next()
    }
    // 目标路由为父亲路由时才跳转
    if (to.name === locateRouteName) {
      // 检测路由表是否有匹配路由
      if (resolveRoute.route.matched.length) {
        const targetFullpath = resolveRoute.href
        // 来源路由和目标路径相同 不需要再跳转了 直接中断导航 并中断进度显示即可
        if (from.fullPath === targetFullpath) {
          next(false)
          this.nprogress.done()
        } else {
          next(targetFullpath)
        }
      } else {
        this.nprogress.done()
        this.notification.error({
          title: 'WRONG_REDIRECT_ROUTE_NAME',
          content: `路由不存在 ${JSON.stringify(redirectRouteName)}`
        })
        next({
          name: 'welcome'
        })
      }
    } else {
      next()
    }
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
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
          // TODO: 暂时使用常量返回true
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
        title: 'NO_TAB_CAN_REDIRECT',
        content: `该路由下没有tab可跳转 ${to.name}`
      })
      return next({
        name: 'welcome'
      })
    }

    const firstRouteName = myAuthedTabs[0] ? myAuthedTabs[0].route.name : ''
    this.redirect({
      locateRouteName: to.name,
      redirectRouteName: firstRouteName,
      from,
      to,
      next
    })
  }
}
