import { GatheringApi, AddEarnestParams } from '@/api/v1/finance/gathering'
import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { TransactionApi } from '@/api/v1/sold/transaction'
import { tap } from 'rxjs/operators'
import { ContractApi } from '@/api/v1/setting/contract'
import { forkJoin } from 'rxjs'

@Injectable()
export class AddService {
  loading$ = new State({})
  memberList$ = new State({})
  saleList$ = new State({})
  paymentMethodList$ = new State({})
  constructor(
    private contractApi: ContractApi,
    private gatheringApi: GatheringApi,
    private transactionApi: TransactionApi
  ) {}
  @Effect()
  getMember(member: string, type: number) {
    return this.transactionApi.getMemberList(member, type).pipe(
      tap((res: any) => {
        this.memberList$.commit(() => res.list)
      })
    )
  }
  @Effect()
  getCodeNumber(type: string) {
    return this.contractApi.getCodeNumber(type)
  }
  getSaleList() {
    return this.transactionApi.getTransactionSaleList().pipe(
      tap((res: any) => {
        this.saleList$.commit(() => res.list)
      })
    )
  }
  @Effect()
  getPaymentMethodList() {
    return this.transactionApi
      .getMemberPaymentList({
        product_type: 8
      })
      .pipe(
        tap((res: any) => {
          this.paymentMethodList$.commit(() => res.list)
        })
      )
  }
  @Effect()
  serviceInit() {
    return forkJoin(this.getPaymentMethodList(), this.getSaleList())
  }
  @Effect()
  addEarnest(params: AddEarnestParams) {
    return this.gatheringApi.addEarnest(params)
  }
}
