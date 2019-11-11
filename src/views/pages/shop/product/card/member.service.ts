import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
@Injectable()
export class MemberService implements Controller {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'shop-product-card-member') {
      next({
        name: 'shop-product-card-member-list'
      })
    } else {
      next()
    }
  }
}
