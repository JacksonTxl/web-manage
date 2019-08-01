import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { ContractApi } from '@/api/v1/setting/contract'
import { forkJoin } from 'rxjs'
import { tap, pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { State, Computed } from 'rx-state'
import { AuthService } from '@/services/auth.service'

interface ListState {
  list: any[]
}

@Injectable()
export class ListService extends Store<ListState> implements RouteGuard {
  state$: State<ListState>
  list$: Computed<any[]>
  auth$ = this.authService.authMap$({
    edit: 'brand:contract:contract_tpl|edit'
  })
  constructor(
    private contractApi: ContractApi,
    private authService: AuthService
  ) {
    super()
    this.state$ = new State({
      list: []
    })
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
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
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init()
  }
}
