import { UserService } from '@/services/user.service'
import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap, map } from 'rxjs/operators'
import { ShopStaffApi, GetStaffSoldInput } from '@/api/v1/staff/staff'
import { cloneDeep } from 'lodash-es'

@Injectable()
export class SoldService implements Controller {
  page$ = new State({})
  soldInfo$ = new State([])
  loading$ = new State({})
  orderStatus$ = this.userService.getOptions$('sold_common.order_status').pipe(
    map(list => {
      return [{ label: '全部订单状态', value: -1 }, ...cloneDeep(list)]
    })
  )
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
