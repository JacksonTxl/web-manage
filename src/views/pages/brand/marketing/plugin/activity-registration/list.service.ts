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
            let auth = {
              isEdit: 1,
              isAdv: 1,
              isName: 1,
              isCopy: 1,
              isCancel: 1
            }
            if (item.activity_status.id === 1) {
              auth.isCopy = 0
            } else if (item.activity_status.id === 2) {
              auth.isEdit = 0
              auth.isAdv = 0
              auth.isCancel = 0
            } else if (item.activity_status.id === 3) {
              auth.isEdit = 0
              auth.isAdv = 0
              auth.isCancel = 0
            } else if (item.activity_status.id === 4) {
              auth.isAdv = 0
              auth.isCopy = 0
            } else if (item.activity_status.id === 5) {
              auth.isEdit = 0
              auth.isAdv = 0
              auth.isName = 0
              auth.isCancel = 0
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
