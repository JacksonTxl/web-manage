import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberAPi } from '@/api/v1/member'

interface CardsListInfoState {
  memberListInfo: any
}
@Injectable()
export class ListService extends Store<CardsListInfoState> {
  state$: State<CardsListInfoState>
  memberListInfo$: Computed<string>
  constructor(private cardsApi: MemberAPi) {
    super()
    this.state$ = new State({
      memberListInfo: {}
    })
    this.memberListInfo$ = new Computed(
      this.state$.pipe(pluck('memberListInfo'))
    )
  }
  SET_CARDS_LIST_INFO(memberListInfo: CardsListInfoState) {
    this.state$.commit(state => {
      state.memberListInfo = memberListInfo
    })
  }

  getListInfo(paramsObj: any) {
    return this.cardsApi.getMember(paramsObj)
  }

  removeWechatBind(id: number) {
    return this.cardsApi.removeWechatBind(id)
  }

  beforeRouteUpdate(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getListInfo(to.query).subscribe(res => {
      console.log(res, '获取数据to.query', to.query)
      this.SET_CARDS_LIST_INFO(res)
      next()
    })
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getListInfo(to.query ? to.query : {}).subscribe(res => {
      console.log(res, '获取数据')
      this.SET_CARDS_LIST_INFO(res)
      next()
    })
  }
}
