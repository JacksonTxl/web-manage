import { LoginApi, LoginAccountInput, LoginPhoneInput } from '@/api/login'
import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, withNamespace } from 'rx-state/src'
import { tap } from 'rxjs/operators'

interface User {
  id: string
  name: string
}
const ns = withNamespace('userService')
@Injectable()
export class UserService {
  user$: State<User>
  menut$: State<any[]>
  constructor(private loginApi: LoginApi) {
    this.user$ = new State({}, ns('user'))
    this.menut$ = new State([], ns('menu'))
  }
  SET_USER(user: User) {
    this.user$.commit(() => user)
  }
  loginAccount(data: LoginAccountInput) {
    return this.loginApi.loginAccount(data).pipe(
      tap(res => {
        this.SET_USER(res.user)
      })
    )
  }
  loginMail(data: LoginPhoneInput) {
    return this.loginApi.loginPhone(data)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: Function) {
    console.log('userService start')
    console.log(this.loginApi)
    next()
  }
}
