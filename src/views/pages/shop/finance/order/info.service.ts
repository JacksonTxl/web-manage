import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { OrderApi } from '@/api/v1/finance/order'
import { tap } from 'rxjs/operators'

@Injectable()
export class InfoService implements RouteGuard {
    info$ = new State({})
    loading$ = new State({})
    id = '';
    tabs$ = new State([]);
    constructor(private orderApi: OrderApi) {}
    @Effect()
    getInfo(id:string) {
      return this.orderApi.getOrderInfo(id).pipe(tap((res:any) => {
        this.info$.commit(() => res.info)
        this.tabs$.commit(() => {
          const tabs = [{ label: '收款明细', route: { name: 'shop-finance-order-info-collection-details', query: { id } } },
            { label: '商品信息', route: { name: 'shop-finance-order-info-commodity-info', query: { id } } }]
          if ((res.info.pay_status === 2 || res.info.pay_status === 3) && (res.info.order_status === 1 || res.info.order_status === 2)) {
            tabs.push({ label: '退款信息', route: { name: 'shop-finance-order-info-refund-info', query: { id } } })
          }
          return tabs
        })
      }))
    }
    beforeEach(to:ServiceRoute, from:ServiceRoute, next:()=>{}) {
      this.id = to.meta.query.id
      this.getInfo(to.meta.query.id).subscribe(res => {
        next()
      })
    }
}
