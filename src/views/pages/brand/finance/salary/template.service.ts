import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'
@Injectable()
export class TemplateService {
  authTabs$ = this.redirectService.getAuthTabs$('brand-finance-salary-template')
  constructor(private redirectService: RedirectService) {}
}
