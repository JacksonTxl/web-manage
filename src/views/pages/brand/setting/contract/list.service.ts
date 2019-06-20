import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { ContractApi } from '@/api/v1/setting/contract'
import { forkJoin } from 'rxjs'
import { tap, pluck, map } from 'rxjs/operators'
import { Store } from '@/services/store'
import { State, Computed, log } from 'rx-state'
import { LayoutBrandService } from '@/services/layouts/layout-brand.service'
import { AuthService } from '@/services/auth.service'

interface ListState {
  list: any[]
}

@Injectable()
export class ListService extends Store<ListState> implements RouteGuard {
  state$: State<ListState>
  list$: Computed<any[]>
  auth$: Computed<any[]>
  constructor(
    private contractApi: ContractApi,
    private layoutBrand: LayoutBrandService,
    private authService: AuthService
  ) {
    super()
    this.state$ = new State({
      list: [],
      auth: {
        edit: this.authService.can('brand:contract:contract_tpl|edit')
      }
    })
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  SET_LIST(list: any[]) {
    this.state$.commit(state => {
      state.list = list
    })
  }
  getList() {
    return this.contractApi.getList().pipe(
      tap(res => {
        this.SET_LIST(res.list)
      })
    )
  }
  init() {
    return forkJoin(this.getList()).pipe(tap(() => {
      this.initBreadcrumbs()
    }))
  }
  initBreadcrumbs() {
    this.layoutBrand.SET_BREADCRUMBS([
      {
        label: '合同模版列表',
        route: { name: '' }
      }
    ])
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init()
  }
}
