import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { CabinetAreaService as AreaService } from './cabinet#/area.service'
@Injectable()
export class CabinetService implements RouteGuard {
  constructor(private areaService: AreaService) {}
  beforeRouteEnter(to: ServiceRoute, form: ServiceRoute, next: any) {
    this.areaService.getList().subscribe(() => {
      next()
    })
  }
}
