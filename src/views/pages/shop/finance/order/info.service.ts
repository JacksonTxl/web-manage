import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state'
import { OrderApi } from '@/api/v1/finance/order'
import { tap, pluck } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
import { RedirectService } from '@/services/redirect.service'

@Injectable()
export class InfoService implements Controller {
  info$: Computed<any>
  tabs$ = new State([])
  auth$: Computed<object>
  state$: State<any>
  constructor(private orderApi: OrderApi, private authService: AuthService) {
    this.state$ = new State({
      auth: {}
    })
    this.info$ = new Computed(this.state$.pipe(pluck('info')))
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  @Effect()
  getInfo(id: string) {
    return this.orderApi.getOrderInfo(id).pipe(
      tap((res: any) => {
        res = this.authService.filter(res, 'auth')
        this.state$.commit(state => {
          state.info = res.info
          state.auth = res.auth
        })
        this.tabs$.commit(() => {
          const tabs = [
            {
              label: '收款明细',
              route: {
                name: 'shop-finance-order-info-collection-details',
                query: { id }
              }
            },
            {
              label: '商品信息',
              route: {
                name: 'shop-finance-order-info-commodity-info',
                query: { id }
              }
            }
          ]
          if (res.info.order_status === 4) {
            tabs.push({
              label: '退款信息',
              route: {
                name: 'shop-finance-order-info-refund-info',
                query: { id }
              }
            })
          }
          return tabs
        })
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute) {
    return this.getInfo(to.meta.query.id)
  }
}
