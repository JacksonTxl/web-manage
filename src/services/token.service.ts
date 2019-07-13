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
import { NProgressService } from './nprogress.service'

interface TokenState {
  /**
   * 用户token
   */
  token: string
}
@Injectable()
export class TokenService extends Store<TokenState> implements RouteGuard {
  state$: State<TokenState>
  token$: Computed<string>
  constructor(
    private router: ServiceRouter,
    private appConfig: AppConfig,
    private nprogressService: NProgressService
  ) {
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
    this.nprogressService.SET_TEXT('用户凭证获取完毕')
    if (!this.token$.snapshot()) {
      console.log('token redirect login')
      this.router.push({
        name: 'account-login',
        force: true
      })
      next(false)
    } else {
      console.log('token next')
      next()
    }
  }
}
