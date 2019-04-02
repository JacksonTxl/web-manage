import { LoginApi, LoginPhoneInput, LoginAccountInput } from '@/api/login'
import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state'
import { tap, pluck } from 'rxjs/operators'
import { Store } from './store'
import { forkJoin } from 'rxjs'

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
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: Function) {
    console.log('userService start')
    next()
  }
}
