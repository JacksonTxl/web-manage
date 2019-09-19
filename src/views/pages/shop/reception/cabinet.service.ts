import { forkJoin } from 'rxjs'
import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { Effect, State } from 'rx-state/src'
import { CabinetAreaService as AreaService } from '../setting/components#/area.service'
import { CabinetApi, DelInput } from '@/api/v1/setting/cabinet'
import { AuthService } from '@/services/auth.service'
import { CabinetListService } from './components#/cabinet-list.service'

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
    private cabinetApi: CabinetApi,
    private authService: AuthService,
    private cabinetListService: CabinetListService
  ) {}
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
  init(query: any) {
    return forkJoin(
      this.cabinetListService.getList(query.type, query.id),
      this.areaService.getList()
    )
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
