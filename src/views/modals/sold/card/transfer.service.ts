import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { ShopPersonalCourseApi } from '@/api/v1/course/personal/shop'
import { tap } from 'rxjs/operators'
import { ContractApi } from '@/api/v1/setting/contract'
import { CardApi, TransferCardInput } from '@/api/v1/sold/cards'

@Injectable()
export class TransferService {
  loading$ = new State({})
  memberList$ = new State({})
  depositTransferInfo$ = new State({})
  timeScope$ = new State({})
  constructor(private contractApi:ContractApi, private memberApi: ShopPersonalCourseApi, private cardApi:CardApi) {}
  @Effect()
  getMember(member:string) {
    return this.memberApi.getMemberList(member).pipe(tap((res:any) => {
      this.memberList$.commit(() => res.list)
    }))
  }
  @Effect()
  getDepositeTransferInfo(id:string, type:string) {
    return this.cardApi.getCardTransferInfo(id, type).pipe(tap((res:any) => {
      this.depositTransferInfo$.commit(() => res.info)
    }))
  }
  @Effect()
  editCardTransfer(params:TransferCardInput, id:string, type:string) {
    return this.cardApi.editCardTransfer(params, id, type)
  }
  @Effect()
  getCodeNumber(id:string) {
    return this.contractApi.getCodeNumber(id)
  }
}
