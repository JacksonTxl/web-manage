import { Injectable, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state'
import { RedirectService } from '@/services/redirect.service'
@Injectable()
export class GeneralService {
  authTabs$ = this.redirectService.getAuthTabs$('brand-setting-general')
  constructor(private redirectService: RedirectService) {}
}
