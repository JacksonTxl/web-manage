import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { RedirectService } from '@/services/redirect.service'
@Injectable()
export class ListService {
  authTabs$ = this.redirectService.getAuthTabs$('shop-sold-course-list')
  routerName$ = new State([])
  constructor(private redirectService: RedirectService) {}
  @Effect()
  getRouterMsg(params: any) {
    this.routerName$.commit(() => params)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getRouterMsg(to.name)
    next()
  }
}
