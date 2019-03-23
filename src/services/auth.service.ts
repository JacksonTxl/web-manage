import Cookie from 'js-cookie'
import {
  ServiceRoute,
  RouteGuard,
  Injectable,
  ServiceRouter
} from 'vue-service-app'
import { AppConfig } from '@/constants/config'
import { State, getSnapshot } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Observable } from 'rxjs'

interface AuthState {
  /**
   * 用户token
   */
  token: string
}
@Injectable()
export class AuthService implements RouteGuard {
  state$: State<AuthState>
  token$: Observable<string>
  constructor(private router: ServiceRouter, private appConfig: AppConfig) {
    this.state$ = new State(
      {
        token: Cookie.get(this.appConfig.TOKEN_NAME) || ''
      },
      'AuthService.state$'
    )
    this.token$ = this.state$.pipe(pluck('token'))
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
  // token当前状态
  get tokenSnapshot(): string {
    return getSnapshot(this.token$)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: Function) {
    console.log('authService start')
    if (!this.tokenSnapshot) {
      this.router.push({
        name: 'user-login',
        query: {
          radom: Math.random()
            .toString(16)
            .slice(2)
        }
      })
      next(false)
    } else {
      next()
    }
  }
}
