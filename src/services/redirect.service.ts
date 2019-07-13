import { ServiceRouter, ServiceRoute, Injectable } from 'vue-service-app'

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

interface TabRedirectConfig {
  /**
   * 当前路由名
   */
  locateRouteName: string
  /**
   * 需要跳转的下一级tab路由名列表
   */
  redirectTabRouteNames: string[]
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
 * 负责应用内的跳转服务
 * 包括 菜单跳转 tab跳转等
 */
@Injectable()
export class RedirectService {
  constructor(private router: ServiceRouter) {}
  /**
   * 菜单跳转
   */
  redirect(redirectConfig: RedirectConfig) {
    const { redirectRouteName, locateRouteName, to, next } = redirectConfig
    const resolveRoute = this.router.resolve({
      name: redirectRouteName
    })
    if (to.name === locateRouteName) {
      // 检测路由表有该路由
      if (resolveRoute.route.matched.length) {
        next({
          name: redirectRouteName,
          query: {
            _t: Math.random()
              .toString(16)
              .slice(3)
          }
        })
      } else {
        next({
          name: 'error',
          query: {
            title: 'REDIRECT_ERROR',
            content: `未找到匹配路由 [ ${redirectRouteName} ]`
          }
        })
      }
    } else {
      next()
    }
  }
  /**
   * 标签页跳转
   */
  tabRedirect(tabRedirectConfig: TabRedirectConfig) {
    const {
      locateRouteName,
      redirectTabRouteNames,
      to,
      next
    } = tabRedirectConfig
    const redirectRouteName = redirectTabRouteNames[0]

    this.redirect({
      locateRouteName,
      redirectRouteName,
      to,
      next
    })
  }
}
