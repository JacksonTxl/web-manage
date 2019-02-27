import { Service, ServiceRoute } from 'vue-service-app'

class LlfService extends Service {
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: Function) {
    console.log(to.meta.query)
    next()
  }
}

export const llfService = new LlfService()
