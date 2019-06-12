import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'

@Injectable()
export class ScheduleService implements RouteGuard {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'shop-product-course-schedule') {
      next({
        name: 'shop-product-course-schedule-team'
      })
    } else {
      next()
    }
  }
}
