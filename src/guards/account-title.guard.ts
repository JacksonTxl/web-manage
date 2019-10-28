import { RouteGuard, ServiceRoute, Injectable } from 'vue-service-app'
import { TitleService } from '@/services/title.service'

@Injectable()
export class AccountTitleGuard implements RouteGuard {
  constructor(private titleService: TitleService) {}
  beforeRouteEnter(to: ServiceRoute) {
    this.titleService.SET_NORMAL_TITLE(to.meta.title)
  }
}
