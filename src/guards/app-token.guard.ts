import { TokenService } from '@/services/token.service'
import { Injectable, RouteGuard } from 'vue-service-app'

/**
 * 登录态校验
 */
@Injectable()
export class AppTokenGuard implements RouteGuard {
  constructor(private tokenService: TokenService) {}
  beforeEach() {
    if (!this.tokenService.token$.snapshot()) {
      location.href = '/account/login'
    }
  }
}
