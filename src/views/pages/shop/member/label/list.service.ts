import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { LabelApi, AddLabel, EditParams, ListParams } from '@/api/v1/label'
import { AuthService } from '@/services/auth.service'

interface LabelListInfoState {
  list: any
}
@Injectable()
export class ListService extends Store<LabelListInfoState> implements RouteGuard {
  state$: State<LabelListInfoState>
  list$ = new State([])
  page$ = new State({})
  auth$: Computed<Object>
  constructor(private labelApi: LabelApi, private authService: AuthService) {
    super()
    this.state$ = new State({
      list: [],
      auth: {
        add: this.authService.can('shop:member:tag|add')
      }
    })
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  @Effect()
  getListInfo(params: ListParams) {
    return this.labelApi.getLabelList(params).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }

  deleteLabel(id: number) {
    return this.labelApi.deleteLabel(id)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getListInfo(to.meta.query)
  }
}
