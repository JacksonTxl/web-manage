import { Injectable } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class ListService {
  authTabs$ = this.authService.getAuthTabs$('shop-product-card-deposit-list')
  constructor(private authService: AuthService) {}
}
