import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { AreaSeatApi, AddInput, UpdateInput } from '@/api/v1/shop/area_seat'

interface ResState {
  resData: object
}
@Injectable()
export class SiteService extends Store<ResState> {
  state$: State<ResState>
  resData$: Computed<object>
  constructor(private areaSeatApi: AreaSeatApi) {
    super()
    this.state$ = new State({
      resData: {}
    })
    this.resData$ = new Computed(this.state$.pipe(pluck('resData')))
  }
  protected SET_STATE(data: object) {
    this.state$.commit(state => {
      state.resData = data
    })
  }
  @Effect()
  add(params: AddInput) {
    return this.areaSeatApi.add(params)
  }
  @Effect()
  update(params: UpdateInput) {
    return this.areaSeatApi.update(params)
  }
  @Effect()
  getInfo(id: number) {
    return this.areaSeatApi.getInfo(id).pipe(
      tap(res => {
        this.SET_STATE(res)
      })
    )
  }
  del(id: number) {
    return this.areaSeatApi.del(id)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    return this.getInfo(to.meta.query.id)
  }
}
