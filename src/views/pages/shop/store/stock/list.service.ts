import { Injectable } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class ListService {
  authTabs$ = this.authService.getAuthTabs$('shop-store-stock-list')
  constructor(private authService: AuthService) {}
}
