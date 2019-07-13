import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { StudioComponentService } from '../dashboard#/studio.component.service'
@Injectable()
export class StudioService implements RouteGuard {
  constructor(
        private studioComponentService: StudioComponentService
  ) {}

  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.studioComponentService.init().subscribe(next)
  }
}
