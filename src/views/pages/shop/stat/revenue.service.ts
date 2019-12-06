import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { StatApi, RevenueShopListQuery } from '@/api/v1/stat/shop'
import { UserService } from '@/services/user.service'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class RevenueService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  todayInfo$ = new State([])
  total$ = new State({})
  authTabs$ = this.authService.getAuthTabs$('shop-stat-revenue')
  constructor(
    private StatApi: StatApi,
    private authService: AuthService,
    private userService: UserService
  ) {}
  @Effect()
  getRevenueShopList(query: RevenueShopListQuery) {
    return this.StatApi.getRevenueShopList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
        this.total$.commit(() => res.total)
      })
    )
  }
  getRevenueShopToday(query: any) {
    return this.StatApi.getRevenueShopToday(query).pipe(
      tap((res: any) => {
        let data = res.info
        const arr = [
          {
            label: '今日总营收(元)',
            value: data.total_amount || 0
          },
          {
            label: `${this.userService.c('member_card')}营收(元)`,
            value: data.member_card_amount || 0
          },
          {
            label: '私教课营收(元)',
            value: data.personal_course_amount || 0
          },
          {
            label: '团体课营收(元)',
            value: data.team_course_amount || 0
          },
          {
            label: '课程包营收(元)',
            value: data.package_course_amount || 0
          },
          {
            label: '云店营收(元)',
            value: data.shop_amount || 0
          },
          {
            label: '其它营收(元)',
            value: data.other_amount || 0
          }
        ]
        const obj = {
          time: data.updated_time,
          res: arr
        }
        this.todayInfo$.commit(() => obj)
      })
    )
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return this.getRevenueShopList(to.meta.query)
  }
}
