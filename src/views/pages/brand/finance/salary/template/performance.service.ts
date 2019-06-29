import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { FinanceApi, SalaryBasicQuery } from '@/api/v1/finance'
import { AuthService } from '@/services/auth.service'

interface PerFormanceState {
    list: Object
}
@Injectable()
export class PerformanceService extends Store<PerFormanceState> {
    state$: State<PerFormanceState>
    list$: Computed<Object>
    auth$: Computed<Object>
    constructor(private cardsApi: FinanceApi, private authService: AuthService) {
      super()
      this.state$ = new State({
        list: {},
        auth: {
          add: this.authService.can('brand_shop:salary:commission_template|add')
        }
      })
      this.list$ = new Computed(this.state$.pipe(pluck('list')))
      this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
    }
    getList(query:SalaryBasicQuery) {
      return this.cardsApi.getPerformanceList(query).pipe(
        tap(res => {
          res = this.authService.filter(res)
          this.state$.commit(state => {
            state.list = res
          })
        })
      )
    }

    deleteTemplate(id: any) {
      return this.cardsApi.deletePerformance(id)
    }

    beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
      this.getList({ size: to.meta.query.size, page: to.meta.query.page }).subscribe(() => {
        next()
      })
    }
}
