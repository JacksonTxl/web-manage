import Cookie from 'js-cookie'
import { StRoute, StRouteGuard } from '@/types'
const TOKEN_NAME = 'saas-token'

export class AuthService implements StRouteGuard {
  token: string | undefined = this.getAuthToken()
  getAuthToken() {
    return Cookie.get(TOKEN_NAME)
  }
  setAuthToken(token: string) {
    Cookie.set(TOKEN_NAME, token, { expires: 7 })
  }
  removeAuthToken() {
    Cookie.remove(TOKEN_NAME)
  }
  beforeRouteEnter(to: StRoute, from: StRoute, next: any) {
    if (!this.token) {
      location.href = '/user/login'
      return next(false)
    }
    return next()
  }
}

export const authService = new AuthService()
