import Cookie from 'js-cookie'
import {
  RouteGuard,
  Injectable,
  ServiceRouter,
  ServiceRoute
} from 'vue-service-app'
import { AppConfig } from '@/constants/config'
import { State, Computed } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from './store'

interface AuthState {
  /**
   * 用户token
   */
  token: string
}
@Injectable()
export class AuthService extends Store<AuthState> implements RouteGuard {
  state$: State<AuthState>
  token$: Computed<string>
  constructor(private router: ServiceRouter, private appConfig: AppConfig) {
    super()
    this.state$ = new State({
      token: Cookie.get(this.appConfig.TOKEN_NAME) || ''
    })
    this.token$ = new Computed(this.state$.pipe(pluck('token')))
    this.token$.subscribe(token => {
      Cookie.set(this.appConfig.TOKEN_NAME, token, { expires: 7 })
    })
  }
  SET_TOKEN(token: string) {
    this.state$.commit(state => {
      state.token = token
    })
  }
  REMOVE_TOKEN() {
    this.state$.commit(state => {
      state.token = ''
    })
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: Function) {
    console.log('authService start')
    console.log(this.token$.snapshot())
    if (!this.token$.snapshot()) {
      this.router.push({
        name: 'user-login',
        force: true
      })
      next(false)
    } else {
      next()
    }
  }
}
