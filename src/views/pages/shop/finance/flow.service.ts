import { Injectable } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class FlowService {
  authTabs$ = this.authService.getAuthTabs$('shop-finance-flow')
  constructor(private authService: AuthService) {}
}
