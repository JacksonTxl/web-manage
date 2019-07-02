import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { MarketingApi, GetInviteTableInput } from '@/api/v1/marketing/marketing'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'

@Injectable()
export class DataService implements RouteGuard {
  loading$ = new State({})
  statInfo$ = new State({})
  reportList$ = new State([])
  reportPage$ = new State({})
  inviteeList$ = new State([])
  inviteePage$ = new State({})
  constructor(private marketingApi: MarketingApi) {}
  // 活动统计
  getInviteStat() {
    return this.marketingApi.getInviteStat().pipe(tap((res:any) => {
      this.statInfo$.commit(() => res.info)
    }))
  }
  // 邀请有礼活动效果数据
  getInviteReport(query:GetInviteTableInput) {
    return this.marketingApi.getInviteReport(query).pipe(tap((res:any) => {
      this.reportList$.commit(() => res.list)
      this.reportPage$.commit(() => res.page)
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
      this.getInviteStat(),
      this.getInviteReport({ page: 1, size: 20 }),
      this.getInviteInvitee({ page: 1, size: 20 }))
  }
  beforeEach(to:ServiceRoute, from:ServiceRoute, next:()=>{}) {
    this.init().subscribe(res => {
      next()
    })
  }
}
