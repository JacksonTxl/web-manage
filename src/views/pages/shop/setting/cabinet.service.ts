import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { CabinetAreaService as AreaService } from './cabinet#/area.service'
import { CabinetApi, DelInput } from '@/api/v1/setting/cabinet'
import { CabinetListService } from './cabinet#/cabinet-list.service'
@Injectable()
export class CabinetService implements RouteGuard {
  constructor(
    private areaService: AreaService,
    private cabinetListService: CabinetListService,
    private cabinetApi: CabinetApi
  ) {}
  protected init(to: ServiceRoute, next: any) {
    const query = to.meta.query
    const type = query.type
    const id = query.id || 0
    this.cabinetListService.getList(type, id).subscribe(next, () => {
      next(false)
    })
  }
  del(params: DelInput) {
    return this.cabinetApi.del(params)
  }
  beforeRouteEnter(to: ServiceRoute, form: ServiceRoute, next: any) {
    const id = to.meta.query.id
    this.areaService.getList().subscribe(() => {
      if (id) {
        this.init(to, next)
      } else {
        next()
      }
    })
  }
  beforeRouteUpdate(to: ServiceRoute, form: ServiceRoute, next: any) {
    this.init(to, next)
  }
}
