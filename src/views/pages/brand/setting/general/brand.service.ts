import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { BrandApi, UpdateInput } from '@/api/v1/setting/brand'

interface BrandState {
  resData: Object
}
@Injectable()
export class BrandService extends Store<BrandState> {
  state$: State<BrandState>
  resData$: Computed<Object>
  constructor(private brandApi: BrandApi) {
    super()
    this.state$ = new State({
      resData: {}
    })
    this.resData$ = new Computed(this.state$.pipe(pluck('resData')))
  }
  getInfo() {
    return this.brandApi.getInfo().pipe(
      tap(res => {
        this.SET_BRAND(res)
      })
    )
  }
  @Effect()
  update(data: UpdateInput) {
    return this.brandApi.update(data)
  }
  protected SET_BRAND(data: BrandState) {
    this.state$.commit(state => {
      state.resData = data
    })
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getInfo().subscribe(next, () => {
      next(false)
    })
  }
}
