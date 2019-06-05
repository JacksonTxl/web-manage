import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
@Injectable()
export class TeamService implements RouteGuard {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'brand-product-course-team') {
      next({
        name: 'brand-product-course-team-list'
      })
    } else {
      next()
    }
  }
}
