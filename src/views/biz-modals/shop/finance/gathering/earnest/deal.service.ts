import { UserService } from '@/services/user.service'
import { Injectable } from 'vue-service-app'
import { State, Effect, Action } from 'rx-state'
import { TransactionApi, TransactionListInput } from '@/api/v1/sold/transaction'
import { GatheringApi } from '@/api/v1/finance/gathering'
import { tap } from 'rxjs/operators'
import { anyAll } from '@/operators'

@Injectable()
export class DealService {
  info$ = new State({})
  list$ = new State([])
  loading$ = new State({})
  productTypes$ = this.userService.getOptions$('transaction.product_type')
  constructor(
    private transactionApi: TransactionApi,
    private gatheringApi: GatheringApi,
    private userService: UserService
  ) {}
  // 获取定金订单详情
  getInfo(id: number) {
    return this.gatheringApi.getEarnestInfo(id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }

  // 获取初始数据
  @Effect()
  init(id: number) {
    return anyAll(this.getInfo(id))
  }

  // 获取产品列表
  @Effect()
  getList(params: TransactionListInput) {
    return this.transactionApi.getTransactionList(params).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
      })
    )
  }
}
