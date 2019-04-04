import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { BrandApi, BrandInput } from '@/api/v1/brand'

interface BrandState {
  brand: Object
}
@Injectable()
export class BrandService extends Store<BrandState> {
  state$: State<BrandState>
  brand$: Computed<Object>
  constructor(private brandApi: BrandApi) {
    super()
    this.state$ = new State({
      brand: {}
    })
    this.brand$ = new Computed(this.state$.pipe(pluck('brand')))
  }
  getBrandInfo() {
    return this.brandApi.getInfo()
  }
  @Effect()
  saveBrandInfo(data: BrandInput) {
    return this.brandApi.update(data)
  }
  protected SET_BRAND(data: BrandState) {
    this.state$.commit(state => {
      state.brand = data
    })
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('before enter')
    this.getBrandInfo().subscribe(res => {
      this.SET_BRAND(res)
    })
    next()
  }
}
