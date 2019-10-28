import { Injectable, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class GeneralService {
  authTabs$ = this.authService.getAuthTabs$('brand-setting-general')
  constructor(private authService: AuthService) {}
}
