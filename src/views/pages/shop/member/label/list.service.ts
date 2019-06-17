import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { LabelApi, AddLabel, EditParams, ListParams } from '@/api/v1/label'
import { AuthService } from '@/services/auth.service'

interface LabelListInfoState {
  listInfo: Object
}
@Injectable()
export class ListService extends Store<LabelListInfoState> {
  state$: State<LabelListInfoState>
  listInfo$: Computed<Object>
  auth$: Computed<Object>
  constructor(private labelApi: LabelApi, private authService: AuthService) {
    super()
    this.state$ = new State({
      listInfo: [],
      auth: {
        add: this.authService.can('shop:member:tag|add')
      }
    })
    this.listInfo$ = new Computed(
      this.state$.pipe(pluck('listInfo'))
    )
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  SET_LABEL_LIST_INFO(memberListInfo: LabelListInfoState) {
    this.state$.commit(state => {
      state.listInfo = memberListInfo
    })
  }

  getListInfo(params: ListParams) {
    return this.labelApi.getLabelList(params).pipe(
      tap(res => {
        res = this.authService.filter(res)
      })
    )
  }

  deleteLabel(id: number) {
    return this.labelApi.deleteLabel(id)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getListInfo({
      page: 1,
      size: 51,
      tag_name: to.meta.query.tag_name
    }).subscribe(res => {
      this.SET_LABEL_LIST_INFO(res)
      next()
    })
  }
}
