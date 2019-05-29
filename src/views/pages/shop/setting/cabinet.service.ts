import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { CabinetAreaService as AreaService } from './cabinet#/area.service'
import { TemporaryService } from './cabinet#/temporary.service'
import { LongTermService } from './cabinet#/long-term.service'
import { CabinetApi, DelInput } from '@/api/v1/setting/cabinet'
@Injectable()
export class CabinetService implements RouteGuard {
  constructor(
    private areaService: AreaService,
    private temporaryService: TemporaryService,
    private longTermService: LongTermService,
    private cabinetApi: CabinetApi
  ) {}
  protected init(to: ServiceRoute, next: any) {
    const query = to.meta.query
    const type = query.type
    const id = query.id || 0
    if (type === 'long-term') {
      this.longTermService.getList(id).subscribe(next, () => {
        next(false)
      })
    } else {
      this.temporaryService.getList(id).subscribe(next, () => {
        next(false)
      })
    }
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
