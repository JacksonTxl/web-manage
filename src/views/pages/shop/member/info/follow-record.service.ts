import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { MemberApi } from '@/api/v1/member'

@Injectable()
export class FollowRecordService implements Controller {
  list$ = new State([])
  constructor(private memberApi: MemberApi) {}
  getFollowRecordList(id: number) {
    return this.memberApi.getFollowRecordList(id).pipe(
      tap(res => {
        this.list$.commit(() => res.list)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    const { id } = to.meta.query
    return this.getFollowRecordList(id)
  }
}
