import { Injectable } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class GatheringService {
  authTabs$ = this.authService.getAuthTabs$('shop-finance-gathering')
  constructor(private authService: AuthService) {}
}
