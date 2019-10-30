import { anyAll } from '@/operators/any-all'
import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap, map } from 'rxjs/operators'
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
  SET_LIST(list: any[]) {
    this.list$.commit(() => list)
  }
  @Effect()
  getList(params: GetSignUpList) {
    return this.signUpApi.getSignUpList(params).pipe(
      tap((res: any) => {
        const list = res.list.map((item: any) => {
          item.auth.isEdit = item.auth['brand:activity:sign_up|edit']
          item.auth.isAdv = item.auth['brand:activity:sign_up|promotion']
          item.auth.isName = item.auth['brand:activity:sign_up|list']
          item.auth.isCopy = item.auth['brand:activity:sign_up|add']
          item.auth.isCancel = item.auth['brand:activity:sign_up|end']
          return item
        })
        this.SET_LIST(list)
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
