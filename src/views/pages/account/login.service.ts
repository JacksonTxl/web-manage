import { MessageService } from '@/services/message.service'
import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { LoginApi, LoginAccountInput, LoginPhoneInput } from '@/api/login'
import { TokenService } from '@/services/token.service'

interface StaffState {
  name: string
  age: number
}
@Injectable()
export class LoginService extends Store<StaffState> {
  state$: State<StaffState>
  name$: Computed<string>
  constructor(
    private loginApi: LoginApi,
    private tokenService: TokenService,
    private msg: MessageService
  ) {
    super()
    this.state$ = new State({})
    this.name$ = new Computed(this.state$.pipe(pluck('name')))
  }
  @Effect()
  loginAccount(data: LoginAccountInput) {
    return this.loginApi.loginAccount(data).pipe(
      tap(res => {
        this.tokenService.SET_TOKEN(res.token)
      })
    )
  }
  loginPhone(params: LoginPhoneInput) {
    return this.loginApi.loginPhone(params).pipe(
      tap(res => {
        this.msg.success({
          content: '登录成功'
        })
      })
    )
  }
  logout() {
    return this.loginApi.logout().pipe(
      tap(res => {
        this.msg.success({ content: '注销成功' })
      })
    )
  }
  getCaptcha(params: any) {
    return this.loginApi.getCaptcha(params)
  }
}
