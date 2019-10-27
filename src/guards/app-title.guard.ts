import { TitleService } from '@/services/title.service'
import { ServiceRoute, Injectable, RouteGuard } from 'vue-service-app'

@Injectable()
export class AppTitleGuard implements RouteGuard {
  constructor(private titleService: TitleService) {}
  beforeRouteEnter(to: ServiceRoute) {
    this.titleService.SET_TITLE(to.meta.title)
  }
}
