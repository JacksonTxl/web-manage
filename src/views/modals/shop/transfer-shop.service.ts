import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberApi } from '@/api/v1/member'

interface CardsTableModelState {
  lableInfo: any,
  list: []
}
@Injectable()
export class TransferShopService extends Store<CardsTableModelState> {
  state$: State<CardsTableModelState>
  info$: Computed<string>
  list$: Computed<any>
  constructor(private memberApi: MemberApi) {
    super()
    this.state$ = new State({
      info: {},
      list: []
    })
    this.info$ = new Computed(this.state$.pipe(pluck('info')))
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
  }

  getMemberBuy(data: any) {
    return this.memberApi.getMemberBuy(data).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.list = res.list
        })
      })
    )
  }
  getMemberTransfer(data: any) {
    return this.memberApi.getMemberTransfer(data)
  }
  getMemberShop() {
    return this.memberApi.getMemberShop()
  }
  getMemberTransferShop(id: string) {
    return this.memberApi.getMemberTransferShop(id)
  }
}
