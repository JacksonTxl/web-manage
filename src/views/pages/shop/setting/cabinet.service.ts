import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { CabinetAreaService as AreaService } from './cabinet#/area.service'
import { CabinetApi, DelInput } from '@/api/v1/setting/cabinet'
import { CabinetListService } from './cabinet#/cabinet-list.service'
import { AuthService } from '@/services/auth.service'

interface ListState {

}
@Injectable()
export class CabinetService implements RouteGuard {
  state$: State<ListState>
  auth$: Computed<any>
  constructor(
    private areaService: AreaService,
    private cabinetListService: CabinetListService,
    private cabinetApi: CabinetApi,
    private authService: AuthService
  ) {
    this.state$ = new State({
      auth: {
        areaAdd: this.authService.can('shop:cabinet:cabinet_area|add'),
        areaEdit: this.authService.can('shop:cabinet:cabinet_area|edit'),
        areaDel: this.authService.can('shop:cabinet:cabinet_area|del'),
        batchAdd: this.authService.can('shop:cabinet:cabinet|batch_add'),
        batchPrice: this.authService.can('shop:cabinet:cabinet|price'),
        batchDel: this.authService.can('shop:cabinet:cabinet|batch_del')
      }
    })
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  protected init(to: ServiceRoute, next: any) {
    const query = to.meta.query
    const type = query.type
    const id = query.id || 0
    this.cabinetListService.getList(type, id).subscribe(next, () => {
      next(false)
    })
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
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
