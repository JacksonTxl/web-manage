import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state'
import { OrderApi } from '@/api/v1/finance/order'
import { tap, pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { AuthService } from '@/services/auth.service'

export interface SetState {
  info: any,
  auth: object
}

@Injectable()
export class InfoService extends Store<SetState> implements RouteGuard {
    info$: Computed<any>;
    id = '';
    tabs$ = new State([]);
    auth$: Computed<object>
    constructor(
      private orderApi: OrderApi,
      private authService: AuthService
    ) {
      super()
      this.state$ = new State({
        auth: {
        }
      })
      this.info$ = new Computed(this.state$.pipe(pluck('info')))
      this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
    }
    @Effect()
    getInfo(id:string) {
      return this.orderApi.getOrderInfo(id).pipe(tap((res:any) => {
        res = this.authService.filter(res, 'auth')
        this.state$.commit(state => {
          state.info = res.info
          state.auth = res.auth
        })
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
      const routeName = to.name
      this.id = to.meta.query.id
      if (routeName === 'shop-finance-order-info-collection-details') {
        this.getInfo(to.meta.query.id).subscribe(res => {
          next()
        })
      } else {
        next()
      }
    }
}
