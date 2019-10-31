import { ServiceRoute, Injectable, ServiceRouter } from 'vue-service-app'
import { AuthService } from './auth.service'
import { NProgressService } from './nprogress.service'
import { NotificationService } from './notification.service'
import { UserService } from './user.service'
import { Errors } from '@/constants/errors'

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
export class RedirectService {
  constructor(
    private router: ServiceRouter,
    private nprogress: NProgressService,
    private notification: NotificationService,
    private errors: Errors
  ) {}
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
        title: this.errors.REDIRECT_ROUTE_EMPTY,
        content: `路由${to.name}的可跳转子路由为空 [redirect.service]`
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
          title: this.errors.REDIRECT_ROUTE_NAME_NOT_EXIST,
          content: `跳转路由${JSON.stringify(
            redirectRouteName
          )}不存在 [redirect.service]`
        })
        next(false)
      }
    } else {
      next()
    }
  }
}
