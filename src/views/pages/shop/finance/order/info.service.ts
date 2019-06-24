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
            { label: '商品信息', route: { name: 'shop-finance-order-info-commodity-info', query: { id: res.info.product_id, type: this.getOrderType(res.info.product_type) } } }]
          if ((res.info.pay_status === 2 || res.info.pay_status === 3) && (res.info.order_status === 1 || res.info.order_status === 2)) {
            tabs.push({ label: '退款信息', route: { name: 'shop-finance-order-info-refund-info', query: { id } } })
          }
          return tabs
        })
      }))
    }
    getOrderType(type: number) {
      //  1-会员卡 2-私教课 3-团体课 4-课程包 5-储值卡 6-小班课 7-手续费 8-定金 9-押金
      let orderType = 'member/card'
      switch (type) {
        case 1:
          orderType = 'member/card'
          break
        case 2:
          orderType = 'personal/course'
          break
        case 3:
          orderType = 'member/card'
          break
        case 4:
          orderType = 'package/course'
          break
        case 5:
          orderType = 'deposit/card'
          break
        case 6:
          orderType = 'member/card'
          break
        case 7:
          orderType = 'member/card'
          break
        case 8:
          orderType = 'advance'
          break
        case 9:
          orderType = 'member/card'
          break
      }
      return orderType
    }
    beforeEach(to:ServiceRoute, from:ServiceRoute, next:()=>{}) {
      this.id = to.meta.query.id
      console.log(to.path)
      this.getInfo(to.meta.query.id).subscribe(res => {
        next()
      })
    }
}