import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
@Injectable()
export class TeamService implements RouteGuard {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'shop-product-course-manage-team') {
      next({
        name: 'shop-product-course-manage-team-list'
      })
    } else {
      next()
    }
  }
}
