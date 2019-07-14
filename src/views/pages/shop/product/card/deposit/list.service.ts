import { Injectable, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state'
import { RedirectService } from '@/services/redirect.service'
@Injectable()
export class ListService {
  authTabs$ = this.redirectService.getAuthTabs$('shop-product-card-deposit-list')
  constructor(private redirectService: RedirectService) {}
}
