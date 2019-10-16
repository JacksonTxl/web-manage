import { anyAll } from '@/operators/any-all'
import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { MarketingApi } from '@/api/v1/marketing/marketing'
import { tap } from 'rxjs/operators'
import { SignUpApi, GetSignUpList } from '@/api/v1/marketing/sign-up'
import { UserService } from '@/services/user.service'

@Injectable()
export class RosterService implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  activityInfo$ = new State({})
  ticketTypeOptions$ = new State({})
  ticketStatus$ = this.userService.getOptions$('plugin.ticket_status')
  PLUGIN_TYPE_ACTIVITY = 4
  constructor(
    private signUpApi: SignUpApi,
    private marketingApi: MarketingApi,
    private userService: UserService
  ) {}
  @Effect()
  getList(params: any) {
    return this.signUpApi.getSignUpRoster(params).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  getActivityInfo(activity_id: number) {
    return this.signUpApi.getActivityInfo(activity_id).pipe(
      tap(res => {
        this.activityInfo$.commit(() => res.info)
        this.ticketTypeOptions$.commit(() => {
          const list = [{ label: '全部', value: -1 }]
          res.info.ticket_list.map((item: any) => {
            return {
              label: item.name,
              value: item.id
            }
          })
          return list
        })
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.getActivityInfo(to.meta.query.id)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
