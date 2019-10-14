import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { MarketingApi } from '@/api/v1/marketing/marketing'
import { tap } from 'rxjs/operators'
import { State, computed } from 'rx-state'
import { forkJoin } from 'rxjs'

@Injectable()
export class PluginService {
  info$ = new State({
    marketing: []
  })
  operation$ = new State([])
  num$ = new State([])
  pluginList$ = computed(
    (info: any) => {
      return info.marketing.map((item: any) => {
        // 优惠券
        // switch (Number(item.plugin_type)) {
        //   case 1:
        //     item.route = 'brand-marketing-plugin-coupon-list'
        //     item.img =
        //       'https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/plugin/coupon.svg'
        //     break
        //   case 2:
        //     item.route = 'brand-marketing-plugin-invitation-index-data'
        //     item.img =
        //       'https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/plugin/invite.svg'
        //     break
        //   case 3:
        //     item.route = 'brand-marketing-plugin-lottery-index'
        //     item.img =
        //       'https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/plugin/lottery.svg'
        //     break
        //   case 4:
        //     item.route = 'brand-marketing-plugin-crowd-index'
        //     item.img =
        //       'https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/plugin/crowd.svg'
        //     break
        // }
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
  getMarktingOperationInfo() {
    return this.marketingApi.getMarktingOperationInfo().pipe(
      tap(res => {
        this.operation$.commit(() => res.info.operation)
      })
    )
  }
  getMarktingNumInfo() {
    return this.marketingApi.getMarktingNumInfo().pipe(
      tap(res => {
        this.num$.commit(() => res.info.num)
      })
    )
  }
  init() {
    return forkJoin(
      this.getMarktingOperationInfo(),
      this.getInfo(),
      this.getMarktingNumInfo()
    )
  }
  beforeRouteEnter() {
    return this.init()
  }
}
