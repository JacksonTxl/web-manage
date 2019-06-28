import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state/src'
import { MarketingApi, GetInviteTableInput } from '@/api/v1/marketing/marketing'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'

@Injectable()
export class DataService implements RouteGuard {
  loading$ = new State({})
  reportInfo$ = new State({})
  dayList$ = new State([])
  dayPage$ = new State({})
  inviteeList$ = new State([])
  inviteePage$ = new State({})
  constructor(private marketingApi: MarketingApi) {}
  // 活动统计
  getInviteReport() {
    return this.marketingApi.getInviteReport().pipe(tap((res:any) => {
      this.reportInfo$.commit(() => res.info)
    }))
  }
  // 邀请有礼活动效果数据
  getInviteDay(query:GetInviteTableInput) {
    return this.marketingApi.getInviteDay(query).pipe(tap((res:any) => {
      this.dayList$.commit(() => res.list)
      this.dayPage$.commit(() => res.page)
    }))
  }
  // 邀请有礼邀请数据
  getInviteInvitee(query:GetInviteTableInput) {
    return this.marketingApi.getInviteInvitee(query).pipe(tap((res:any) => {
      this.inviteeList$.commit(() => res.list)
      this.inviteePage$.commit(() => res.page)
    }))
  }
  init() {
    return forkJoin(
      this.getInviteReport(),
      this.getInviteDay({ page: 1, size: 20 }),
      this.getInviteInvitee({ page: 1, size: 20 }))
  }
  beforeEach(to:ServiceRoute, from:ServiceRoute, next:()=>{}) {
    this.init().subscribe(res => {
      next()
    })
  }
}
