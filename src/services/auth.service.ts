import Cookie from 'js-cookie'
import {
  RouteGuard,
  Injectable,
  ServiceRouter,
  ServiceRoute
} from 'vue-service-app'
import { AppConfig } from '@/constants/config'
import { State, getSnapshot, Computed } from 'rx-state'
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
      token: Cookie.get(this.appConfig.TOKEN_NAME) || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGktc2Fhcy1kZXYuc3R5ZC5jbiIsImlhdCI6MTU1NDExMjg1OSwiYXVkIjoiIiwianRpIjoiaEg2M1JKV3ExdlpWeGNLd28zQUZyVGprT1JiQXZmZlQiLCJuYmYiOjE1NTQxMTI4NDksImV4cCI6MTU1NDExNDY1OSwibG9naW5fdHlwZSI6MSwiaXNfbXVsdGkiOjAsInN0YWZmX2lkIjoxfQ.lYsUxvsF_l2JfXPDwLT_DzqCtA-7XfC9B0oSDGokivo'
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
