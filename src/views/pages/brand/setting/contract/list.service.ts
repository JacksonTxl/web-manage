import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { ContractApi } from '@/api/v1/setting/contract'
import { forkJoin } from 'rxjs'
import { tap, pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { State, Computed, log } from 'rx-state'
import { LayoutService } from '@/services/layouts/layout.service'

interface ListState {
  list: any[]
}

@Injectable()
export class ListService extends Store<ListState> implements RouteGuard {
  state$: State<ListState>
  list$: Computed<any[]>
  constructor(
    private contractApi: ContractApi,
    private layoutService: LayoutService
  ) {
    super()
    this.state$ = new State({
      list: []
    })
    this.list$ = new Computed(
      this.state$.pipe(
        pluck('list'),
        log('contract/list')
      )
    )
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
    return forkJoin(this.getList())
  }
  initBreadcrumbs() {
    this.layoutService.SET_BREADCRUMBS([
      {
        label: '合同模版列表',
        route: { name: '' }
      }
    ])
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.init().subscribe(() => {
      this.initBreadcrumbs()
      next()
    })
  }
}
