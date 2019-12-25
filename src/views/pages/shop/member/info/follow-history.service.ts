import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { MemberApi } from '@/api/v1/member'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class FollowHistoryService implements Controller {
  followHistoryInfo$ = new State({})
  followInfo$ = new State({})
  auth$ = this.authService.authMap$({
    add: 'shop:member:member_record|add'
  })
  constructor(private memberApi: MemberApi, private authService: AuthService) {}
  getListInfo(id: any) {
    return this.memberApi.getMemberFollowRecord(id).pipe(
      tap(res => {
        console.log(res, '获取数据')
        res = this.authService.filter(res)
        this.followHistoryInfo$.commit(() => res)
      })
    )
  }
  getFollowInfo(id: any) {
    return this.memberApi.getMemberFollow(id).pipe(
      tap(res => {
        console.log(res, '获取数据')
        this.followInfo$.commit(() => res)
      })
    )
  }
  init(id: string) {
    return forkJoin(this.getListInfo(id), this.getFollowInfo(id))
  }
  beforeRouteEnter(to: ServiceRoute) {
    return this.init(to.meta.query.id)
  }
}
