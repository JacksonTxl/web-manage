import { RouteGuard, ServiceRoute, Injectable } from 'vue-service-app'
import { TitleService } from '@/services/title.service'

@Injectable()
export class TitleGuard implements RouteGuard {
  constructor(private titleService: TitleService) {}
  beforeEach(to: ServiceRoute) {
    this.titleService.SET_NORMAL_TITLE(to.meta.title)
  }
}
