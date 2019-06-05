import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
@Injectable()
export class PersonalService implements RouteGuard {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'brand-product-course-personal') {
      next({
        name: 'brand-product-course-personal-list'
      })
    } else {
      next()
    }
  }
}
