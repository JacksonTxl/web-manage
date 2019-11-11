import { UserService } from '@/services/user.service'
import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { MarketingApi } from '@/api/v1/marketing/marketing'
import { tap } from 'rxjs/operators'

@Injectable()
export class EditService implements Controller {
  info$ = new State({})
  product_ranges$ = this.userService.getOptions$('coupon.product_range')
  constructor(
    private marketingApi: MarketingApi,
    private userService: UserService
  ) {}

  // 获取优惠券详情
  getInfo(id: number) {
    return this.marketingApi.getInfo(id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute) {
    if (to.meta.query.id) {
      return this.getInfo(to.meta.query.id)
    }
  }
}
