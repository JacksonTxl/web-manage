import { RouteGuard, ServiceRoute, Injectable } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'
import { NotificationService } from '@/services/notification.service'
import { AuthService } from '@/services/auth.service'
import { Errors } from '@/constants/errors'

/**
 * 跳转守卫
 */
@Injectable()
export class AppTabRedirectGuard implements RouteGuard {
  constructor(
    private authService: AuthService,
    private redirectService: RedirectService,
    private notification: NotificationService,
    private errors: Errors
  ) {}
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    // 当路由没有配置meta.tabs时直接next
    const hasTabsRoutes = to.matched.filter(r => r.meta.tabs)
    if (!hasTabsRoutes.length) {
      return next()
    }
    // 不管当前处于子路由还是父级路由,都要计算下授权的tabs
    hasTabsRoutes.forEach(route => {
      const authedTabs = this.authService.calcAuthedTabsByTabs(route.meta.tabs)
      if (route.name) {
        this.authService.UPDATE_AUTHED_TAB_MAP(route.name, authedTabs)
      }
    })
    // 父路由的跳转逻辑
    if (!to.meta.tabs) {
      console.log(2)
      return next()
    }

    const myAuthedTabs = this.authService.getAuthTabs$(to.name).snapshot()

    if (!myAuthedTabs.length) {
      this.notification.error({
        title: this.errors.NO_AUTH_TAB_CAN_REDIRECT,
        content: `该路由下没有tab可跳转 ${to.name} [redirect.guard] `
      })
      return next({
        name: 'welcome'
      })
    }

    const firstRouteName = myAuthedTabs[0] ? myAuthedTabs[0].route.name : ''
    this.redirectService.redirect({
      locateRouteName: to.name,
      redirectRouteName: firstRouteName,
      from,
      to,
      next
    })
  }
}
