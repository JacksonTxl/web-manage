import Cookie from 'js-cookie'
import {
  ServiceRoute,
  RouteGuard,
  Injectable,
  ServiceRouter
} from 'vue-service-app'
import { appConfig } from '@/constants/config'

@Injectable()
export class AuthService implements RouteGuard {
  appConfig = appConfig
  token: string | undefined = this.getAuthToken()
  constructor(private router: ServiceRouter) {}
  getAuthToken() {
    return Cookie.get(this.appConfig.TOKEN_NAME)
  }
  setAuthToken(token: string) {
    Cookie.set(this.appConfig.TOKEN_NAME, token, { expires: 7 })
  }
  removeAuthToken() {
    Cookie.remove(this.appConfig.TOKEN_NAME)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: Function) {
    console.log('authService start')
    if (!this.token) {
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
