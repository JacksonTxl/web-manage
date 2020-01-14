import { Injectable } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class SellService {
  authTabs$ = this.authService.getAuthTabs$('shop-stat-sell')
  constructor(private authService: AuthService) {}
}
