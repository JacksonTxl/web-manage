import { Injectable, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state'
import { RedirectService } from '@/services/redirect.service'
@Injectable()
export class ListService {
  authTabs$ = this.redirectService.getAuthTabs$('shop-sold-card-list')
  constructor(private redirectService: RedirectService) {}
}
