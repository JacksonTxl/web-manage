import {
  RouteGuard,
  ServiceRoute,
  Injectable,
  ServiceRouter
} from 'vue-service-app'
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
    private router: ServiceRouter,
    private notification: NotificationService,
    private errors: Errors
  ) {}
  beforeEach(to: ServiceRoute) {
    // 当路由没有配置meta.tabs时直接next
    const hasTabsRoutes = to.matched.filter(r => r.meta.tabs)
    if (!hasTabsRoutes.length) {
      return
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
      return
    }

    const myAuthedTabs = this.authService.getAuthTabs$(to.name).snapshot()

    if (!myAuthedTabs.length) {
      this.notification.error({
        title: this.errors.NO_AUTH_TAB_CAN_REDIRECT,
        content: `该路由下没有tab可跳转 ${to.name} [redirect.guard] `
      })
      return this.router.redirect({
        name: 'welcome'
      })
    }

    const firstRouteName = myAuthedTabs[0] ? myAuthedTabs[0].route.name : ''
    return this.redirectService.redirect({
      locateRouteName: to.name,
      redirectRoute: {
        name: firstRouteName
      }
    })
  }
}
