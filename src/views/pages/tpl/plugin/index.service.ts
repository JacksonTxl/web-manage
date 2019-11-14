import { Controller, Injectable, ServiceRoute } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'
import { State, Effect } from 'rx-state'
import { then } from '@/operators'
import { SignUpApi, GetSignUpList } from '@/api/v1/marketing/sign-up'
import { UserService } from '@/services/user.service'

@Injectable()
export class IndexService implements Controller {
  loading$ = new State({})
  list$ = new State([])
  page$ = new State({})
  pluginInfo$ = new State({})
  /**
   * 获取全局的权限 {[权限别名]：权限 }
   */
  auth$ = this.authService.authMap$({
    add: 'brand:activity:sign_up|add',
    checkIn: 'brand:activity:sign_up|check_in'
  })
  /**
   * 从枚举值中响应的选项
   */
  activityStatusOptions$ = this.userService.getOptions$(
    'plugin.activity_status_sign_up_join',
    { addAll: true }
  )
  constructor(
    private authService: AuthService,
    private signUpApi: SignUpApi,
    private userService: UserService
  ) {}
  SET_LIST(list: any[]) {
    this.list$.commit(() => list)
  }
  SET_PAGE(page: any) {
    this.page$.commit(() => page)
  }
  /**
   * 会变更loading$状态
   */
  @Effect()
  getList(params: GetSignUpList) {
    return this.signUpApi.getSignUpList(params).pipe(
      then((res: any) => {
        res = this.authService.filter(res)
        this.SET_LIST(res.list)
        this.SET_PAGE(res.page)
      })
    )
  }
  beforeEach(to: ServiceRoute) {
    console.log(1)
    return this.getList(to.meta.query)
  }
}
