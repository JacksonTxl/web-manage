import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
@Injectable()
export class PackageService implements RouteGuard {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'shop-product-course-manage-package') {
      next({
        name: 'shop-product-course-manage-package-list'
      })
    } else {
      next()
    }
  }
}
