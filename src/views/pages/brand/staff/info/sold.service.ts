import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap, map } from 'rxjs/operators'
import { StaffApi, GetStaffSoldInput } from '@/api/v1/staff'
import { cloneDeep } from 'lodash-es'
import { UserService } from '@/services/user.service'

@Injectable()
export class SoldService implements RouteGuard {
  soldInfo$ = new State({})
  page$ = new State({})
  loading$ = new State({})
  orderStatus$ = this.userService.getOptions$('sold.order_status').pipe(
    map(list => {
      return [{ label: '全部订单状态', value: -1 }, ...cloneDeep(list)]
    })
  )
  constructor(private staffapi: StaffApi, private userService: UserService) {}
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
    const { id } = to.meta.query
    return this.getStaffSoldInfo(id, to.meta.query)
  }
}
