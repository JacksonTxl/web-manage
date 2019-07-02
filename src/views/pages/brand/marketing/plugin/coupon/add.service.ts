import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { MarketingApi, AddMarketingCouponParams, EditMarketingCouponParams } from '@/api/v1/marketing/marketing'
import { tap } from 'rxjs/operators'

@Injectable()
export class AddService {
  loading$ = new State({})
  info$ = new State({})
  constructor(private marketingApi: MarketingApi) {}

  // 新增营销优惠券
  @Effect()
  addMarketingCoupon(params: AddMarketingCouponParams) {
    return this.marketingApi.addMarketingCoupon(params)
  }
  // 编辑营销优惠券
  @Effect()
  editMarketingCoupon(params: EditMarketingCouponParams) {
    return this.marketingApi.editMarketingCoupon(params)
  }
  // 获取优惠券详情
  getInfo(id: number) {
    return this.marketingApi.getInfo(id).pipe(tap((res:any) => {
      this.info$.commit(() => res.info)
    }))
  }
}
