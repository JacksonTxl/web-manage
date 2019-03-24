import { LoginApi, LoginPhoneInput, LoginAccountInput } from '@/api/login'
import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Request, Computed } from 'rx-state'
import { tap, pluck } from 'rxjs/operators'
import { Store } from './store'

interface UserState {
  user: User
  menu: any[]
}
interface User {
  id: string
  name: string
}

@Injectable()
export class UserService extends Store<UserState> {
  state$: State<UserState>
  user$: Computed<User>
  menu$: Computed<any[]>
  constructor(private loginApi: LoginApi) {
    super()
    const initialState = {
      user: {},
      menu: []
    }
    this.state$ = new State(initialState)
    this.user$ = new Computed(this.state$.pipe(pluck('user')))
    this.menu$ = new Computed(this.state$.pipe(pluck('menu')))
  }
  SET_USER(user: User) {
    this.state$.commit(state => {
      state.user = user
    })
  }
  @Request()
  loginAccount(data: LoginAccountInput) {
    return this.loginApi.loginAccount(data).pipe(
      tap(res => {
        this.SET_USER(res.user)
      })
    )
  }
  @Request()
  loginPhone(data: LoginPhoneInput) {
    return this.loginApi.loginPhone(data)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: Function) {
    console.log('userService start')
    next()
  }
}
