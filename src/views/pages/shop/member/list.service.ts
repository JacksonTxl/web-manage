import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberApi } from '@/api/v1/member'

interface MemberListInfoState {
  memberListInfo: any
}
@Injectable()
export class ListService extends Store<MemberListInfoState> {
  state$: State<MemberListInfoState>
  memberListInfo$: Computed<string>
  constructor(private memberApi: MemberApi) {
    super()
    this.state$ = new State({
      memberListInfo: {}
    })
    this.memberListInfo$ = new Computed(
      this.state$.pipe(pluck('memberListInfo'))
    )
  }
  SET_MEMBER_LIST_INFO(memberListInfo: MemberListInfoState) {
    this.state$.commit(state => {
      state.memberListInfo = memberListInfo
    })
  }
  getListInfo(paramsObj: any) {
    return this.memberApi.getMember(paramsObj)
  }

  removeWechatBind(id: number) {
    return this.memberApi.removeWechatBind(id)
  }
  beforeRouteUpdate(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getListInfo(to.meta.query).subscribe(res => {
      console.log(res, '获取数据to.query', to.meta.query)
      this.SET_MEMBER_LIST_INFO(res)
      next()
    })
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getListInfo(to.query ? to.query : {}).subscribe(res => {
      console.log(res, '获取数据')
      this.SET_MEMBER_LIST_INFO(res)
      next()
    })
  }
}
