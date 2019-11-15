import { Injectable, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { AuthService } from '@/services/auth.service'
import { RedirectService } from '@/services/redirect.service'
@Injectable()
export class ListService {
  authTabs$ = this.authService.getAuthTabs$('shop-sold-course-list')
  placeholder$ = new State('')
  constructor(
    private authService: AuthService,
    private redirectService: RedirectService
  ) {}
}
