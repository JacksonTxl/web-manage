import {
  Injectable,
  Controller,
  RouteGuard,
  ServiceRoute
} from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { GroupBuyApi } from '@/api/v1/marketing/group_buy'
import { anyAll } from '@/operators'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'

@Injectable()
export class AddCourseService implements Controller {
  loading$ = new State({})
  shopList$ = new State({})
  courseList$ = new State({})
  constructor(private groupBuyApi: GroupBuyApi) {}
  // 获取门店列表
  @Effect()
  getShopList() {
    return this.groupBuyApi.getShopList().pipe(
      tap((res: any) => {
        this.shopList$.commit(() => res.list)
      })
    )
  }
  @Effect()
  getCourseList(params: { shop_id: number }) {
    console.log('9999999999999999999999')
    return this.groupBuyApi.getCourseList(params).pipe(
      tap((res: any) => {
        console.log(res, '===================')
        this.courseList$.commit(() => res.list)
      })
    )
  }
  init() {
    return forkJoin(this.getShopList())
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init()
  }
}
