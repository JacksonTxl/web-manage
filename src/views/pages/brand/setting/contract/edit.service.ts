import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { ContractApi } from '@/api/v1/setting/contract'
import { forkJoin } from 'rxjs'
import { tap, pluck } from 'rxjs/operators'
import { State, log, Computed } from 'rx-state/src'
import { Store } from '@/services/store'

interface EditState {
  info: any
}
@Injectable()
export class EditService extends Store<EditState> implements RouteGuard {
  state$: State<EditState>
  info$: Computed<any>
  constructor(private contractApi: ContractApi) {
    super()
    this.state$ = new State({ info: {} })
    this.info$ = new Computed(this.state$.pipe(pluck('info')))
  }
  SET_INFO_FIELD(field: string, value: any) {
    console.log(field, value)
    this.state$.commit(state => {
      state.info[field] = value
    })
  }
  getInfo(id: number) {
    return this.contractApi.getInfo(id).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.info = res
        })
      })
    )
  }
  init(id: number) {
    return forkJoin(this.getInfo(id))
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.init(to.meta.query.id).subscribe(() => {
      next()
    })
  }
}
