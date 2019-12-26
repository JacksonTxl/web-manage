import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { MemberApi } from '@/api/v1/member'

@Injectable()
export class TransferShopService {
  list$ = new State([])
  constructor(private memberApi: MemberApi) {}

  getMemberBuy(data: any) {
    return this.memberApi.getMemberBuy(data).pipe(
      tap(res => {
        this.list$.commit(() => res.list)
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
