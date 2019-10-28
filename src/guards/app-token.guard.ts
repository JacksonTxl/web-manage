import { TokenService } from '@/services/token.service'
import { Injectable } from 'vue-service-app'

/**
 * 登录态校验
 */
@Injectable()
export class AppTokenGuard {
  constructor(private tokenService: TokenService) {}
  beforeRouteEnter() {
    if (!this.tokenService.token$.snapshot()) {
      location.href = '/account/login'
    }
  }
}