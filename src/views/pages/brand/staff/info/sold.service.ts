import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { StaffApi, GetStaffSoldInput } from '@/api/v1/staff'

@Injectable()
export class SoldService implements RouteGuard {
  soldInfo$ = new State({})
  page$ = new State({})
  loading$ = new State({})
  constructor(private staffapi: StaffApi) {}
  @Effect()
  getStaffSoldInfo(id: string, query: GetStaffSoldInput) {
    return this.staffapi.getStaffSold(id, query).pipe(
      tap(res => {
        this.soldInfo$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }

  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    console.log('sold service', to.meta.query)
    const {
      id,
      shop_id,
      order_status,
      order_time_first,
      order_time_last,
      keyword,
      size,
      page
    } = to.meta.query
    console.log('sold service')
    return this.getStaffSoldInfo(id, {
      shop_id,
      order_status,
      order_time_first,
      order_time_last,
      keyword,
      size,
      page
    })
  }
}
