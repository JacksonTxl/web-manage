import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberApi } from '@/api/v1/member'
import { forkJoin } from 'rxjs'

interface SoldListInfoState {
  soldListInfo: any
  followInfo: any
}
@Injectable()
export class SoldService extends Store<SoldListInfoState> {
  state$: State<SoldListInfoState>
  soldListInfo$: Computed<string>
  followInfo$: Computed<string>
  constructor(private cardsApi: MemberApi) {
    super()
    this.state$ = new State({
      soldListInfo: {},
      followInfo: {}
    })
    this.soldListInfo$ = new Computed(this.state$.pipe(pluck('soldListInfo')))
    this.followInfo$ = new Computed(this.state$.pipe(pluck('followInfo')))
  }
  SOLD_LIST_INFO(soldListInfo: SoldListInfoState) {
    console.log(soldListInfo)
    this.state$.commit(state => {
      state.soldListInfo = soldListInfo
    })
  }
  getMemberReserve(id: string, params: any) {
    return this.cardsApi.getMemberReserve(id, params).pipe(
      tap(res => {
        console.log(res, '获取数据')

        this.SOLD_LIST_INFO(res)
      })
    )
  }
  getMemberCancel(params: any) {
    return this.cardsApi.getMemberCancel(params)
  }
  getMemberSign(params: any) {
    return this.cardsApi.getMemberSign(params)
  }
  init(id: string, params: any) {
    return forkJoin(this.getMemberReserve(id, params))
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.init(to.meta.query.id, {
      reserve_type: 1,
      size: 20,
      page: 1
    }).subscribe(() => next())
  }
}
/*
  start_date: '',
      reserve_type: 1,
      reserve_status: -1,
      checkin_status: -1,
      size: 20,
      page: 1 */
