import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { FinanceApi, SalaryBasicQuery } from '@/api/v1/finance'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class BasicService implements RouteGuard {
  list$ = new State([])
  loading$ = new State({})
  page$ = new State({})
  auth$ = this.authService.authMap$({
    add: 'brand_shop:salary:basic_template|add'
  })
  constructor(
    private cardsApi: FinanceApi,
    private authService: AuthService
  ) {}
  @Effect()
  getBasicInfo(query:SalaryBasicQuery) {
    return this.cardsApi.getSalaryBasicList(query).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  deleteTemplate(id: any) {
    return this.cardsApi.deleteTemplate(id)
  }
  init(params: SalaryBasicQuery) {
    return this.getBasicInfo(params)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
