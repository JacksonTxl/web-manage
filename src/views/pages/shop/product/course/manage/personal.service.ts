import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'
@Injectable()
export class PersonalService implements RouteGuard {
  constructor(private redirectService: RedirectService) {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.redirectService.redirect({
      locateRouteName: 'shop-product-course-manage-personal',
      redirectRouteName: 'shop-product-course-manage-personal-list',
      next,
      from,
      to
    })
  }
}
