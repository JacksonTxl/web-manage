import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { FinanceApi, SalaryBasicQuery } from '@/api/v1/finance'
import { AuthService } from '@/services/auth.service'

interface BasicState {
    basicInfo: Object
}
@Injectable()
export class BasicService extends Store<BasicState> {
    state$: State<BasicState>
    basicInfo$: Computed<Object>
    auth$: Computed<Object>
    constructor(private cardsApi: FinanceApi, private authService: AuthService) {
      super()
      this.state$ = new State({
        basicInfo: {},
        auth: {
          add: this.authService.can('brand_shop:salary:basic_template|add')
        }
      })
      this.basicInfo$ = new Computed(this.state$.pipe(pluck('basicInfo')))
      this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
    }
    getBasicInfo(query:SalaryBasicQuery) {
      return this.cardsApi.getSalaryBasicList(query).pipe(
        tap(res => {
          res = this.authService.filter(res)
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
