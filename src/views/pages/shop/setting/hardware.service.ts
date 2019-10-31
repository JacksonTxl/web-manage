import { Injectable } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class HardwareService {
  authTabs$ = this.authService.getAuthTabs$('shop-setting-hardware')
  constructor(private authService: AuthService) {}
}
