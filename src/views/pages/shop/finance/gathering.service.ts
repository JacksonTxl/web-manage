import { Injectable } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'
@Injectable()
export class GatheringService {
  authTabs$ = this.redirectService.getAuthTabs$('shop-finance-gathering')
  constructor(private redirectService: RedirectService) {}
}
