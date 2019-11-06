import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { TransactionApi, TransactionListInput } from '@/api/v1/sold/transaction'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
import { UserService } from '@/services/user.service'
@Injectable()
export class ListService implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  auth$ = new State({})
  productTypes$ = this.userService.getOptions$('transaction.product_type')
  constructor(
    private transactionApi: TransactionApi,
    private authService: AuthService,
    private userService: UserService
  ) {}
  @Effect()
  getProductList(params: TransactionListInput) {
    return this.transactionApi.getTransactionList(params).pipe(
      tap((res: any) => {
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.getProductList(to.meta.query)
  }
}
