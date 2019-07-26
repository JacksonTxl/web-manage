import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { AuthService } from '@/services/auth.service'
import { RedirectService } from '@/services/redirect.service'
import { StatApi, RevenueShopListQuery } from '@/api/v1/stat/shop'
interface SetState {}
@Injectable()
export class RevenueService extends Store<SetState> implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  todayInfo$ = new State([])
  // auth$ = this.AuthService.authMap({
  //   add: 'shop:member:member|add',
  //   export: 'shop:member:member|export'
  // })
  authTabs$ = this.redirectService.getAuthTabs$('shop-stat-revenue')
  constructor(
    private StatApi: StatApi,
    private redirectService: RedirectService
  ) {
    super()
    this.state$ = new State({})
  }
  getRevenueShopList(query: RevenueShopListQuery) {
    return this.StatApi.getRevenueShopList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  getRevenueShopToday(query: any) {
    return this.StatApi.getRevenueShopToday(query).pipe(
      tap((res: any) => {
        const arr = [
          {
            label: '总营收(元)',
            value: res.total_amount || 0
          },
          {
            label: '会员卡营收(元)',
            value: res.member_card_amount || 0
          },
          {
            label: '私教课营收(元)',
            value: res.personal_course_amount || 0
          },
          {
            label: '团体课营收(元)',
            value: res.team_course_amount || 0
          },
          {
            label: '课程包营收(元)',
            value: res.package_course_amount || 0
          },
          {
            label: '云店营收(元)',
            value: res.shop_amount || 0
          },
          {
            label: '其它营收(元)',
            value: res.other_amount || 0
          }
        ]
        const obj = {
          res: arr,
          time: res.update_time
        }
        this.todayInfo$.commit(() => obj)
      })
    )
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return this.getRevenueShopList(to.meta.query)
  }
}
