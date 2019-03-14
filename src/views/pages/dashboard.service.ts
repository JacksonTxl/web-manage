import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { HttpService } from '@/services/http.service'

@Injectable()
export class DashboardService implements RouteGuard {
  constructor(private http: HttpService) {}
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log(this.http)
    next()
  }
}
