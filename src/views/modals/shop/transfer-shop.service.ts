import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberAPi } from '@/api/v1/member'

interface CardsTableModelState {
  lableInfo: any
}
@Injectable()
export class TransferShopService extends Store<CardsTableModelState> {
  constructor(private MemberAPi: MemberAPi) {
    super()
  }
  getMemberBuy(data: any) {
    return this.MemberAPi.getMemberBuy(data)
  }
  getMemberTransfer(data: any) {
    return this.MemberAPi.getMemberTransfer(data)
  }
}
