import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { StoreApi, DtoreBoard } from '@/api/v1/shop/store/store'
import { anyAll } from '@/operators'
@Injectable()
export class DataService implements Controller {
  dataProfile$ = new State({})
  storeBoard$ = new State({})
  constructor(private stockApi: StoreApi) {}
  @Effect()
  getDataProfile() {
    return this.stockApi.dataProfile().pipe(
      tap((res: any) => {
        console.log(res)
        this.dataProfile$.commit(() => res)
      })
    )
  }
  @Effect()
  getStoreBoard(query: DtoreBoard) {
    return this.stockApi.storeBoard(query).pipe(
      tap((res: any) => {
        console.log(res)
        this.storeBoard$.commit(() => res)
      })
    )
  }
  @Effect()
  init() {
    return anyAll(
      this.getDataProfile(),
      this.getStoreBoard({ date_type: '', date: '' })
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init()
  }
}
