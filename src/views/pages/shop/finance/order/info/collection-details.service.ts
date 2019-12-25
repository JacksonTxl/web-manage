import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { OrderApi } from '@/api/v1/finance/order'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class CollectionDetailsService implements Controller {
  loading$ = new State({})
  list$ = new State([])
  constructor(private orderApi: OrderApi, private authService: AuthService) {}
  @Effect()
  getList(id: string) {
    return this.orderApi.getOrderFlowList(id).pipe(
      tap((res: any) => {
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query.id)
  }
}
