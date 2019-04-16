import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { ContractApi } from '@/api/v1/setting/contract'
import { forkJoin } from 'rxjs'
import { tap, pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { State, Computed, log } from 'rx-state'

interface ListState {
  list: any[]
}

@Injectable()
export class ListService extends Store<ListState> implements RouteGuard {
  state$: State<ListState>
  list$: Computed<any[]>
  constructor(private contractApi: ContractApi) {
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
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.init().subscribe(() => {
      next()
    })
    // const xhr = new XMLHttpRequest()
    // xhr.open('GET', '/_api/v1/setting/contract/code-details/1')
    // xhr.setRequestHeader('app-id', '11111')
    // xhr.setRequestHeader('app-version', '11111')
    // xhr.setRequestHeader(
    //   'token',
    //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2NhbGhvc3QiLCJpYXQiOjE1NTUwNTEwNDYsImF1ZCI6IiIsImp0aSI6ImNiTjRDX1NWcklxM0ctOFM4T2N0S1EtaDRFQTRaUzI1IiwibmJmIjoxNTU1MDUxMDM2LCJleHAiOjE1NTUwNTI4NDYsImxvZ2luX3R5cGUiOjEsImlzX211bHRpIjowLCJzdGFmZl9pZCI6MX0.9b9g-XVdrjSxCePuVJYrBwXn0RjqgrCGghqn9Wi4AaA'
    // )
    // xhr.send(null)
  }
}
