import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { StatApi } from '@/api/v1/stat/shop'
import { UserService } from '@/services/user.service'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class FollowService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  todayInfo$ = new State([])
  authTabs$ = this.authService.getAuthTabs$('shop-stat-follow')
  constructor(
    private StatApi: StatApi,
    private authService: AuthService,
    private userService: UserService
  ) {}
  @Effect()
  getFollowDateList(query: any) {
    return this.StatApi.getFollowDateList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  getFollowStaffList(query: any) {
    return this.StatApi.getFollowStaffList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  getFollowShopToday(query: any) {
    return this.StatApi.getRevenueShopToday(query).pipe(
      tap((res: any) => {
        let data = res.info
        const arr = [
          {
            label: '电话跟进数',
            value: data.total_amount || 0
          },
          {
            label: '微信跟进数',
            value: data.member_card_amount || 0
          },
          {
            label: '客户到访跟进数',
            value: data.personal_course_amount || 0
          },
          {
            label: '上门拜访跟进数',
            value: data.team_course_amount || 0
          },
          {
            label: '邀约成功数',
            value: data.package_course_amount || 0
          },
          {
            label: '实际到访数',
            value: data.shop_amount || 0
          },
          {
            label: '签约数',
            value: data.other_amount || 0
          },
          {
            label: '购卡数',
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
    console.log(to.meta.query)
    // return to.meta.query.showTable === 'all'
    //   ? this.getFollowDateList(to.meta.query)
    //   : this.getFollowStaffList(to.meta.query)
  }
}
