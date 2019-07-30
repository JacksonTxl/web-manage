import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import {
  MarketingApi,
  AddMarketingCouponParams,
  EditMarketingCouponParams
} from '@/api/v1/marketing/marketing'
import { TitleService } from '@/services/title.service'
import { tap, pluck } from 'rxjs/operators'
import { ShopApi, GetShopBasicInput } from '@/api/v1/shop'

@Injectable()
export class AddService implements RouteGuard {
  loading$ = new State({})
  info$ = new State({})

  constructor(
    private marketingApi: MarketingApi,
    private titleService: TitleService,
    private shopApi: ShopApi
  ) {}

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
    return this.marketingApi.getInfo(id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.meta.query.id) {
      this.titleService.SET_TITLE('编辑优惠券')
    } else {
      this.titleService.SET_TITLE('新增优惠券')
    }
    next()
  }

  getShopBasic(params: GetShopBasicInput) {
    return this.shopApi.getShopBasic(params).pipe(pluck('shops'))
  }
}
