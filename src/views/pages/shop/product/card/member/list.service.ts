import { Injectable } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'
@Injectable()
export class ListService {
  authTabs$ = this.redirectService.getAuthTabs$('shop-product-card-member-list')
  constructor(private redirectService: RedirectService) {}
}
