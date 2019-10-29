import { TitleService } from '@/services/title.service'
import { ServiceRoute, Injectable, RouteGuard } from 'vue-service-app'

@Injectable()
export class AppTitleGuard implements RouteGuard {
  constructor(private titleService: TitleService) {}
  /**
   * 路由导航完毕才设置title
   */
  afterEach(to: ServiceRoute) {
    this.titleService.SET_TITLE(to.meta.title)
  }
}
