import { LoginApi, LoginAccountInput, LoginPhoneInput } from '@/api/login'
import { Injectable, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { tap, map, pluck } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'

interface UserState {
  user: User
  menu: any[]
}
interface User {
  id: string
  name: string
}

@Injectable()
export class UserService {
  state$: State<UserState>
  user$: Observable<User>
  menu$: Observable<any[]>
  constructor(private loginApi: LoginApi, private authService: AuthService) {
    this.state$ = new State({}, 'UserService.state$')
    this.user$ = this.state$.pipe(pluck('user'))
    this.menu$ = this.state$.pipe(pluck('menu'))
  }
  SET_USER(user: User) {
    this.state$.commit(state => {
      state.user = user
    })
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
    next()
  }
}
