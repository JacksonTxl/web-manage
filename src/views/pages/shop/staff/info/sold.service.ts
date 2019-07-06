import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { ShopStaffApi, GetStaffSoldInput } from '@/api/v1/staff/staff'

@Injectable()
export class SoldService implements RouteGuard {
    page$ = new State({})
    soldInfo$ = new State([])
    constructor(private staffApi: ShopStaffApi) {}
    getStaffSoldInfo(id: string, query: GetStaffSoldInput) {
      return this.staffApi.getStaffSold(id, query).pipe(
        tap(res => {
          this.page$.commit(() => res.page)
          this.soldInfo$.commit(() => res.soldInfo)
        })
      )
    }

    beforeEach(to: ServiceRoute, from: ServiceRoute) {
      console.log('sold service', to.meta.query)
      const { id, shop_id, order_status, order_time_first, order_time_last, keyword, size, page } = to.meta.query
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
