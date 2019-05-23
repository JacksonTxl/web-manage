import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { FinanceAPi, SalaryBasicQuery } from '@/api/v1/finance'

interface PerFormanceState {
    list: Object
}
@Injectable()
export class PerformanceService extends Store<PerFormanceState> {
    state$: State<PerFormanceState>
    list$: Computed<Object>
    constructor(private cardsApi: FinanceAPi) {
      super()
      this.state$ = new State({
        list: {}
      })
      this.list$ = new Computed(this.state$.pipe(pluck('list')))
    }
    getList(query:SalaryBasicQuery) {
      return this.cardsApi.getPerformanceList(query).pipe(
        tap(res => {
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
