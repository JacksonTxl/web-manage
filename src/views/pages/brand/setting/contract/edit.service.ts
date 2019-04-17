import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { ContractApi } from '@/api/v1/setting/contract'
import { forkJoin } from 'rxjs'
import { tap, pluck, map } from 'rxjs/operators'
import { State, log, Computed, Effect } from 'rx-state/src'
import { Store } from '@/services/store'
import { RouteService } from '@/services/route.service'

interface EditState {
  info: any
  lawContent: string
}
@Injectable()
export class EditService extends Store<EditState> implements RouteGuard {
  state$: State<EditState>
  info$: Computed<any>
  lawContent$: Computed<string>
  htmlLawContent$: Computed<string>
  constructor(
    private contractApi: ContractApi,
    private routeService: RouteService
  ) {
    super()
    this.state$ = new State({ info: {} })
    this.info$ = new Computed(
      this.state$.pipe(
        pluck('info'),
        log('contract/info')
      )
    )
    this.lawContent$ = new Computed(
      this.state$.pipe(
        pluck('lawContent'),
        log('contract/lawContent')
      )
    )
    this.htmlLawContent$ = new Computed(
      this.lawContent$.pipe(
        map(lawContent => {
          return lawContent
            .replace(/\r\n/g, '<br>')
            .replace(/\n/g, '<br>')
            .replace(/\s/g, '&nbsp;')
        })
      )
    )
  }
  @Effect()
  getInfo() {
    const id = this.routeService.querySnapshot.id
    return this.contractApi.getInfo(id).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.info = res.info
          state.info.contract_type = 1
        })
      })
    )
  }
  @Effect()
  getConstitutionInfo() {
    const id = this.routeService.querySnapshot.id
    return this.contractApi.getConstitutionInfo(id).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.lawContent = res.info.brand_law_content || ''
        })
      })
    )
  }
  @Effect()
  init() {
    return forkJoin(this.getInfo(), this.getConstitutionInfo())
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.init().subscribe(() => {
      next()
    })
  }
}
