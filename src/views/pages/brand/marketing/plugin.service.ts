import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { MarketingApi } from '@/api/v1/marketing/marketing'
import { tap } from 'rxjs/operators'
import { State, computed } from 'rx-state'
import ImgCoupon from '@/assets/img/brand/marketing/coupon.svg'
import ImgInvite from '@/assets/img/brand/marketing/invite.svg'
import ImgLottery from '@/assets/img/brand/marketing/slyder.svg'
import ImgCrowd from '@/assets/img/brand/marketing/people.svg'

@Injectable()
export class PluginService {
  info$ = new State({
    marketing: []
  })
  pluginList$ = computed(
    (info: any) => {
      return info.marketing.map((item: any) => {
        // 优惠券
        switch (Number(item.plugin_type)) {
          case 1:
            item.route = 'brand-marketing-plugin-coupon-list'
            item.img = ImgCoupon
            break
          case 2:
            item.route = 'brand-marketing-plugin-invitation-index-data'
            item.img = ImgInvite
            break
          case 3:
            item.route = 'brand-marketing-plugin-lottery-index'
            item.img = ImgLottery
            break
          case 4:
            item.route = 'brand-marketing-plugin-crowd-index'
            item.img = ImgCrowd
            break
        }
        return item
      })
    },
    [this.info$]
  )
  constructor(private marketingApi: MarketingApi) {}
  getInfo() {
    return this.marketingApi.getMarktingInfo().pipe(
      tap(res => {
        this.info$.commit(() => res.info)
      })
    )
  }
  beforeRouteEnter() {
    return this.getInfo()
  }
}
