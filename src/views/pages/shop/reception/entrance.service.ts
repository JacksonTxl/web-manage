import { Injectable } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class EntranceService {
  authTabs$ = this.authService.getAuthTabs$('shop-stat-course')
  constructor(private authService: AuthService) {}
}
