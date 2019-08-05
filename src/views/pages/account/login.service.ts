import { MessageService } from '@/services/message.service'
import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { LoginApi, LoginAccountInput, LoginPhoneInput } from '@/api/login'
import { TokenService } from '@/services/token.service'

@Injectable()
export class LoginService {
  name$ = new State<string>('')
  constructor(
    private loginApi: LoginApi,
    private tokenService: TokenService,
    private msg: MessageService
  ) {}
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
