import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { FinanceApi, SalaryBasicQuery } from '@/api/v1/finance'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class PerformanceService implements RouteGuard {
  auth$ = this.authService.authMap$({
    add: 'brand_shop:salary:commission_template|add'
  })
    list$ = new State([])
    page$ = new State({})
    loading$ = new State({})

    constructor(private cardsApi: FinanceApi, private authService: AuthService) {}

    @Effect()
    getList(query:SalaryBasicQuery) {
      return this.cardsApi.getPerformanceList(query).pipe(
        tap(res => {
          res = this.authService.filter(res)
          this.page$.commit(() => res.page)
          this.list$.commit(() => res.list)
        })
      )
    }

    deleteTemplate(id: any) {
      return this.cardsApi.deletePerformance(id)
    }

    init(params: SalaryBasicQuery) {
      return this.getList(params)
    }
    beforeEach(to: ServiceRoute, from: ServiceRoute) {
      return this.init(to.meta.query)
    }
}
