import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { LabelApi, AddLabel, EditParams, ListParams } from '@/api/v1/label'

interface LabelListInfoState {
  listInfo: Object
}
@Injectable()
export class ListService extends Store<LabelListInfoState> {
  state$: State<LabelListInfoState>
  listInfo$: Computed<Object>
  constructor(private cardsApi: LabelApi) {
    super()
    this.state$ = new State({
      listInfo: []
    })
    this.listInfo$ = new Computed(
      this.state$.pipe(pluck('listInfo'))
    )
  }
  SET_CARDS_LIST_INFO(memberListInfo: LabelListInfoState) {
    this.state$.commit(state => {
      state.listInfo = memberListInfo
    })
  }

  getListInfo(params: ListParams) {
    return this.cardsApi.getLabelList(params)
  }

  deleteLabel(id: number) {
    return this.cardsApi.deleteLabel(id)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getListInfo({
      page: 1,
      size: 51,
      tag_name: to.meta.query.tag_name
    }).subscribe(res => {
      this.SET_CARDS_LIST_INFO(res)
      next()
    })
  }
}
