import { Injectable, ServiceRoute, Controller } from 'vue-service-app'

@Injectable()
export class CardService implements Controller {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'shop-sold-card') {
      next({
        name: 'shop-sold-card-list'
      })
    } else {
      next()
    }
  }
}
