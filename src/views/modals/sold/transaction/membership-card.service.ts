import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { TransactionApi } from '@/api/v1/sold/transaction'

@Injectable()
export class MembershipCardService {
  indexList$ = new State({})
  constructor(private transactionApi: TransactionApi) {}
  @Effect()
  /* 会员卡详情 */
  getOrderTransactionMemberCard(id: any) {
    // return this.transactionApi.getOrderTransactionMemberCard(id)
  }
  /* 会员卡签单 */
  getOrderTransactionMember(params: any) {
    // return this.transactionApi.getOrderTransactionMember(params)
  }
  /* 优惠券 */
  getOrderTransactionCoupon(query: any) {
    // return this.transactionApi.getOrderTransactionCoupon(query)
  }
  /* 定金列表 */
  getOrderTransactionAdvance(query: any) {
    // return this.transactionApi.getTransactionAdvanceList(query)
  }
}
