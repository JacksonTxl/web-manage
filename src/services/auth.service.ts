import Cookie from 'js-cookie'
import { ServiceRoute, RouteGuard } from 'vue-service-app'
import router from '@/router'
import { State } from 'rx-state/src'

const TOKEN_NAME = 'saas-token'

export class AuthService implements RouteGuard {
  token$: State<string>
  token: string | undefined = this.getAuthToken()
  constructor() {
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
      location.href = '/user/login'
      return next(false)
    }
    return next()
  }
}

export const authService = new AuthService()
