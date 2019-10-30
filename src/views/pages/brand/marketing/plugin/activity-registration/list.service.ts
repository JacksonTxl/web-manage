import { anyAll } from '@/operators/any-all'
import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { SignUpApi, GetSignUpList } from '@/api/v1/marketing/sign-up'
import { UserService } from '@/services/user.service'
import { MessageService } from '@/services/message.service'

@Injectable()
export class ListService implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  pluginInfo$ = new State({})
  auth$ = new State({})
  activityStatus$ = this.userService.getOptions$(
    'plugin.activity_status_sign_up_join',
    { addAll: true }
  )
  constructor(
    private signUpApi: SignUpApi,
    private msg: MessageService,
    private userService: UserService
  ) {}
  @Effect()
  getList(params: GetSignUpList) {
    return this.signUpApi.getSignUpList(params).pipe(
      tap((res: any) => {
        this.list$.commit(() =>
          res.list.map((item: any) => {
            const authTemp = item.auth
            let auth = {
              isEdit: authTemp['brand:activity:sign_up|edit'],
              isAdv: authTemp['brand:activity:sign_up|promotion'],
              isName: authTemp['brand:activity:sign_up|list'],
              isCopy: authTemp['brand:activity:sign_up|add'],
              isCancel: authTemp['brand:activity:sign_up|end']
            }
            item.auth = auth
            return item
          })
        )
        this.page$.commit(() => res.page)
      })
    )
  }
  cancelSignUp(id: number) {
    return this.signUpApi.cancelSignUp(id).pipe(
      tap(res => {
        this.msg.success({ content: '结束活动成功' })
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
