import { Injectable, ServiceRoute } from 'vue-service-app'

@Injectable()
export class LlfService {
  beforeRouteEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    next()
  }
}
