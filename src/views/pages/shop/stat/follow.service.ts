import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { anyAll } from '@/operators'
import { StatApi } from '@/api/v1/stat/shop'
import { UserService } from '@/services/user.service'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class FollowService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  totalInfo$ = new State([])
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
  @Effect()
  getFollowStaffList(query: any) {
    return this.StatApi.getFollowStaffList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  @Effect()
  getFollowShopTotal(query: any) {
    return this.StatApi.getFollowShopTotal(query).pipe(
      tap((res: any) => {
        let data = res
        const arr = [
          {
            label: '电话跟进数',
            value: res.follow_phone || 0
          },
          {
            label: '微信跟进数',
            value: res.follow_wx || 0
          },
          {
            label: '客户到访跟进数',
            value: res.member_visit || 0
          },
          {
            label: '上门拜访跟进数',
            value: res.staff_visit || 0
          },
          {
            label: '邀约成功数',
            value: res.invited_success || 0
          },
          {
            label: '实际到访数',
            value: res.actual_visit || 0
          },
          {
            label: '签约数',
            value: res.is_signed || 0
          },
          {
            label: '购卡数',
            value: res.purchased_card || 0
          }
        ]
        const obj = {
          time: data.updated_time,
          list: arr
        }
        this.totalInfo$.commit(() => obj)
      })
    )
  }
  init(query: any) {
    query.shop_id = this.userService.shop$.value.id
    return query.showTable === 'all'
      ? anyAll(this.getFollowDateList(query), this.getFollowShopTotal(query))
      : anyAll(this.getFollowStaffList(query), this.getFollowShopTotal(query))
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
