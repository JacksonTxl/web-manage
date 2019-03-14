import Cookie from 'js-cookie'
import {
  ServiceRoute,
  RouteGuard,
  Injectable,
  ServiceRouter
} from 'vue-service-app'
import { State } from 'rx-state'

const TOKEN_NAME = 'saas-token'
@Injectable()
export class AuthService implements RouteGuard {
  token$: State<string>
  token: string | undefined = this.getAuthToken()
  constructor(private router: ServiceRouter) {
    this.token$ = new State(Cookie.get(TOKEN_NAME))
  }
  SET_TOKEN(token: string) {
    this.token$.commit(() => token)
  }
  getAuthToken() {
    return Cookie.get(TOKEN_NAME)
  }
  setAuthToken(token: string) {
    Cookie.set(TOKEN_NAME, token, { expires: 7 })
  }
  removeAuthToken() {
    Cookie.remove(TOKEN_NAME)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: Function) {
    if (!this.token) {
      this.router.push({ name: 'user-login' })
      return next(false)
    }
    return next()
  }
}
