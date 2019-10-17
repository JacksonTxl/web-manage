import { anyAll } from '@/operators/any-all'
import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { MarketingApi } from '@/api/v1/marketing/marketing'
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
  activityStatus$ = this.userService.getOptions$('plugin.activity_status')
  PLUGIN_TYPE_ACTIVITY = 4
  constructor(
    private signUpApi: SignUpApi,
    private marketingApi: MarketingApi,
    private msg: MessageService,
    private userService: UserService
  ) {}
  @Effect()
  getList(params: GetSignUpList) {
    return this.signUpApi.getSignUpList(params).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  getIntroductionInfo() {
    return this.marketingApi.getPluginInfo(this.PLUGIN_TYPE_ACTIVITY).pipe(
      tap(res => {
        this.pluginInfo$.commit(() => res.list)
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
  init(params: GetSignUpList) {
    return anyAll(this.getIntroductionInfo())
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
