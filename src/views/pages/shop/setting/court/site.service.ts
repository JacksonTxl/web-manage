import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { AreaSeatApi, AddInput, UpdateInput } from '@/api/v1/shop/area_seat'

@Injectable()
export class SiteService {
  loading$ = new State({})
  state$: State<any>
  resData$: Computed<object>
  constructor(private areaSeatApi: AreaSeatApi) {
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
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getInfo(to.meta.query.id)
  }
}
