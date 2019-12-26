import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { AreaSeatApi, AddInput, UpdateInput } from '@/api/v1/shop/area_seat'

@Injectable()
export class SiteService {
  loading$ = new State({})
  resData$ = new State({})
  constructor(private areaSeatApi: AreaSeatApi) {}
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
        this.resData$.commit(() => res)
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
