import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CardApi, GetMemberListInput } from '@/api/v1/sold/cards'

@Injectable()
export class MemberService implements RouteGuard {
  list$ = new State({})
  page$ = new State({})
  loading$ = new State({})
  constructor(private cardApi: CardApi) {}
  getList(params: GetMemberListInput) {
    return this.cardApi.getMemberList(params, 'member').pipe(tap((res:any) => {
      this.list$.commit(() => res.list)
      this.page$.commit(() => res.page)
    }))
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getList(to.meta.query).subscribe(() => {
      next()
    })
  }
}
