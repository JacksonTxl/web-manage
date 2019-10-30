import { UserService } from '@/services/user.service'
import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import {
  MarketingApi,
  AddMarketingCouponParams,
  EditMarketingCouponParams
} from '@/api/v1/marketing/marketing'
import { tap, pluck } from 'rxjs/operators'
import { ShopApi, GetShopBasicInput } from '@/api/v1/shop'

@Injectable()
export class AddService {
  loading$ = new State({})
  info$ = new State({})
  product_ranges$ = this.userService.getOptions$('coupon.product_range')
  constructor(
    private marketingApi: MarketingApi,
    private userService: UserService,
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
  getShopBasic(params: GetShopBasicInput) {
    return this.shopApi.getShopBasic(params).pipe(pluck('shops'))
  }
}
