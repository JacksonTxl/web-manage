import { SignUpApi, GetSignUpSignList } from '@/api/v1/marketing/sign-up'
import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap, pluck } from 'rxjs/operators'
import { MessageService } from '@/services/message.service'

@Injectable()
export class CheckinService implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})

  constructor(private signUpApi: SignUpApi, private msg: MessageService) {}
  @Effect()
  getList(params: GetSignUpSignList) {
    return this.signUpApi.getSignUpSignList(params).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  updateSignUpChecked(id: number) {
    return this.signUpApi.updateSignUpChecked(id).pipe(
      tap(res => {
        this.msg.success({ content: '票种签到成功' })
      })
    )
  }
  beforeEach(to: ServiceRoute) {
    // if (!to.meta.query.keyword) return
    // return this.getList(to.meta.query)
  }
}
