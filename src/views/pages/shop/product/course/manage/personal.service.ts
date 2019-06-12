import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
@Injectable()
export class PersonalService implements RouteGuard {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'shop-product-course-manage-personal') {
      next({
        name: 'shop-product-course-manage-personal-list'
      })
    } else {
      next()
    }
  }
}
