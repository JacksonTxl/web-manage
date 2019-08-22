import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { MemberApi } from '@/api/v1/member'
import { TransactionApi } from '@/api/v1/sold/transaction'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'
import { UserService } from '@/services/user.service'

@Injectable()
export class MissingCaedService {
  loading$ = new State({})
  paymentMethodList$ = new State({})
  payMethodList$ = this.userService.getOptions$('member.pay_method')
  staffList$ = new State([])
  constructor(
    private memberApi: MemberApi,
    private transactionApi: TransactionApi,
    private userService: UserService
  ) {}
  @Effect()
  getMemberList(key_word: string) {
    return this.memberApi.getSearchMemberList({ key_word }).pipe(
      tap((res: any) => {
        this.staffList$.commit(() => res.list)
      })
    )
  }
  @Effect()
  getPaymentMethodList(order_id: number) {
    return this.transactionApi.getPaymentMethodList(order_id).pipe(
      tap((res: any) => {
        this.paymentMethodList$.commit(() => res.list)
      })
    )
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
