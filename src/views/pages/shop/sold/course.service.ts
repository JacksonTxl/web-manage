import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'

@Injectable()
export class CourseService implements RouteGuard {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'shop-sold-course') {
      next({
        name: 'shop-sold-course-list'
      })
    } else {
      next()
    }
  }
}
