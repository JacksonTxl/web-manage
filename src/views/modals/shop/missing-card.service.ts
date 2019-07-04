import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { Store } from '@/services/store'
import { MemberApi } from '@/api/v1/member'
import { TransactionApi } from '@/api/v1/sold/transaction'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'

interface CardsTableModelState {
  lableInfo: any
}
@Injectable()
export class MissingCaedService extends Store<CardsTableModelState> {
  paymentMethodList$ = new State({});
  staffList$ = new State([])
  constructor(private memberApi: MemberApi, private transactionApi: TransactionApi) {
    super()
  }
  @Effect()
  getMemberList(member:string, type: number) {
    return this.transactionApi.getMemberList(member, type).pipe(tap((res:any) => {
      this.staffList$.commit(() => res.list)
    }))
  }
  @Effect()
  getPaymentMethodList(order_id: number) {
    return this.transactionApi.getPaymentMethodList(order_id).pipe(tap((res:any) => {
      this.paymentMethodList$.commit(() => res.list)
    }))
  }
  getMemberPhysical(data: any) {
    return this.memberApi.getMemberPhysical(data)
  }
  getMemberPhysicalBind(id: any, data: any) {
    return this.memberApi.getMemberPhysicalBind(id, data)
  }
  @Effect()
  serviceInit(data: any) {
    return forkJoin(this.getMemberPhysical(data))
  }
}
