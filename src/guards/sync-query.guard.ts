import { RouteService } from '@/services/route.service'
import { ServiceRoute, Injectable, RouteGuard } from 'vue-service-app'

@Injectable()
export class SyncQueryGuard implements RouteGuard {
  constructor(private routeService: RouteService) {}
  beforeEach(to: ServiceRoute) {
    this.routeService.SET_QUERY(to.meta.query)
  }
}
