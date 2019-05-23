import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { FinanceAPi, SalaryBasicQuery } from '@/api/v1/finance'

interface BasicState {
    basicInfo: Object
}
@Injectable()
export class BasicService extends Store<BasicState> {
    state$: State<BasicState>
    basicInfo$: Computed<Object>
    constructor(private cardsApi: FinanceAPi) {
      super()
      this.state$ = new State({
        basicInfo: {}
      })
      this.basicInfo$ = new Computed(this.state$.pipe(pluck('basicInfo')))
    }
    getBasicInfo(query:SalaryBasicQuery) {
      return this.cardsApi.getSalaryBasicList(query).pipe(
        tap(res => {
          this.state$.commit(state => {
            state.basicInfo = res
          })
        })
      )
    }

    deleteTemplate(id: any) {
      return this.cardsApi.deleteTemplate(id)
    }

    beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
      console.log('-===========', to.meta.query)
      this.getBasicInfo({ size: to.meta.query.size, page: to.meta.query.page }).subscribe(() => {
        next()
      })
    }
}
