import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { LabelApi, AddLabel, EditParams } from '@/api/v1/label'

interface CardsListInfoState {
  listInfo: Object
}
@Injectable()
export class ListService extends Store<CardsListInfoState> {
  state$: State<CardsListInfoState>
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
  SET_CARDS_LIST_INFO(memberListInfo: CardsListInfoState) {
    this.state$.commit(state => {
      state.listInfo = memberListInfo
    })
  }

  getListInfo() {
    return this.cardsApi.getLabelList()
  }

  deleteLabel(id: number) {
    return this.cardsApi.deleteLabel(id)
  }

  addLabel(params: AddLabel) {
    return this.cardsApi.addLabel(params)
  }

  editLabel(id: number, params: EditParams) {
    return this.cardsApi.editLabel(id, params)
  }

  beforeRouteUpdate(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getListInfo().subscribe(res => {
      console.log(res, '获取数据to.query')
      this.SET_CARDS_LIST_INFO(res)
      next()
    })
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getListInfo().subscribe(res => {
      console.log(res, '获取数据')
      this.SET_CARDS_LIST_INFO(res)
      next()
    })
    // next()
  }
}
