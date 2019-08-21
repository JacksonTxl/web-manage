import { Injectable } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { MemberApi } from '@/api/v1/member'

@Injectable()
export class TransferShopService {
  state$: State<any>
  info$: Computed<string>
  list$: Computed<any>
  constructor(private memberApi: MemberApi) {
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
