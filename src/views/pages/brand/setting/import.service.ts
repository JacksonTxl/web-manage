import { Injectable } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'
@Injectable()
export class ImportService {
  authTabs$ = this.redirectService.getAuthTabs$('brand-setting-import')
  constructor(private redirectService: RedirectService) {}
}
