import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap, map } from 'rxjs/operators'
import { StaffApi, GetStaffSoldInput } from '@/api/v1/staff'
import { cloneDeep } from 'lodash-es'
import { UserService } from '@/services/user.service'
import { forkJoin } from 'rxjs'

@Injectable()
export class SoldService implements Controller {
  soldInfo$ = new State({})
  page$ = new State({})
  loading$ = new State({})
  shopOptions$ = new State([])
  orderStatus$ = this.userService.getOptions$('sold_common.order_status').pipe(
    map(list => {
      return [{ label: '全部订单状态', value: -1 }, ...cloneDeep(list)]
    })
  )
  constructor(private staffApi: StaffApi, private userService: UserService) {}
  @Effect()
  getStaffSoldInfo(id: string, query: GetStaffSoldInput) {
    return this.staffApi.getStaffSold(id, query).pipe(
      tap(res => {
        this.soldInfo$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  getShopList() {
    return this.staffApi.getShopList().pipe(
      map(res => {
        const list = cloneDeep(res.shops).map((item: any) => {
          return { label: item.shop_name, value: item.id }
        })
        return [{ value: -1, label: '全部门店' }, ...list]
      }),
      tap(list => {
        this.shopOptions$.commit(() => list)
      })
    )
  }
  init(id: string, query: GetStaffSoldInput) {
    return forkJoin(this.getStaffSoldInfo(id, query), this.getShopList())
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    const { id } = to.meta.query
    return this.init(id, to.meta.query)
  }
}
