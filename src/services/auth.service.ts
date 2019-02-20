import Cookie from 'js-cookie'
import { Route } from 'vue-router'
import { CanActivate } from '@/types/route'

const TOKEN_NAME = 'saas-token'

export class AuthService implements CanActivate {
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
  canActivate(to: Route, from: Route, next: any) {
    if (!this.token) {
      location.href = '/login'
      return next(false)
    }
    return next()
  }
}

export const authService = new AuthService()
