import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { StoreApi } from '@/api/v1/shop/store/store'
import { anyAll } from '@/operators'
@Injectable()
export class DataService implements Controller {
  dataProfile$ = new State({})
  constructor(private stockApi: StoreApi) {}
  @Effect()
  getDataProfile() {
    return this.stockApi.dataProfile().pipe(
      tap((res: any) => {
        this.dataProfile$.commit(() => res)
      })
    )
  }
  @Effect()
  init() {
    return anyAll(this.getDataProfile())
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init()
  }
}
