import { UserService } from '@/services/user.service'
import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { ShopStaffApi, GetStaffSoldInput } from '@/api/v1/staff/staff'

@Injectable()
export class SoldService implements RouteGuard {
  page$ = new State({})
  soldInfo$ = new State([])
  loading$ = new State({})
  orderStatus$ = this.userService.getOptions$('sold.order_status')
  constructor(
    private staffApi: ShopStaffApi,
    private userService: UserService
  ) {}

  @Effect()
  getStaffSoldInfo(id: string, query: GetStaffSoldInput) {
    return this.staffApi.getStaffSold(id, query).pipe(
      tap(res => {
        this.page$.commit(() => res.page)
        this.soldInfo$.commit(() => res.list)
      })
    )
  }

  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    const { id } = to.meta.query
    return this.getStaffSoldInfo(id, to.meta.query)
  }
}
