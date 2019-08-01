import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { Effect, State } from 'rx-state/src'
import { CabinetAreaService as AreaService } from './cabinet#/area.service'
import { CabinetApi, DelInput } from '@/api/v1/setting/cabinet'
import { CabinetListService } from './cabinet#/cabinet-list.service'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class CabinetService implements RouteGuard {
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    areaAdd: 'shop:cabinet:cabinet_area|add',
    areaEdit: 'shop:cabinet:cabinet_area|edit',
    areaDel: 'shop:cabinet:cabinet_area|del',
    batchAdd: 'shop:cabinet:cabinet|batch_add',
    batchPrice: 'shop:cabinet:cabinet|price',
    batchDel: 'shop:cabinet:cabinet|batch_del'
  })
  constructor(
    private areaService: AreaService,
    private cabinetListService: CabinetListService,
    private cabinetApi: CabinetApi,
    private authService: AuthService
  ) {}
  protected init(to: ServiceRoute, next: any) {
    const query = to.meta.query
    const type = query.type
    const id = query.id || 0
    this.cabinetListService.getList(type, id).subscribe(next, () => {
      next(false)
    })
  }
  @Effect()
  del(params: DelInput) {
    return this.cabinetApi.del(params)
  }
  sort(list: any[]) {
    list = list.map((item, index) => {
      return {
        id: item.id,
        sorted: index
      }
    })
    return this.areaService.sort({ list })
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
