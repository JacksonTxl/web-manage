import { UserService } from '@/services/user.service'
import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { MarketingApi } from '@/api/v1/marketing/marketing'
import { tap } from 'rxjs/operators'

@Injectable()
export class EditService implements RouteGuard {
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
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.meta.query.id) {
      this.getInfo(to.meta.query.id).subscribe(res => {
        next()
      })
    } else {
      next()
    }
  }
}
