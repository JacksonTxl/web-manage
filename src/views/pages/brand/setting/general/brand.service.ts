import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { BrandApi, UpdateInput } from '@/api/v1/setting/brand'

@Injectable()
export class BrandService implements RouteGuard {
  resData$ = new State({})
  loading$ = new State({})
  constructor(private brandApi: BrandApi) {}
  getInfo() {
    return this.brandApi.getInfo().pipe(
      tap(res => {
        this.resData$.commit(() => res)
      })
    )
  }
  @Effect()
  update(data: UpdateInput) {
    return this.brandApi.update(data)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getInfo()
  }
}
