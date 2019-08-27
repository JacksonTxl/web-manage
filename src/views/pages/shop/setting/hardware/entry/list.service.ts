import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { UserService } from '@/services/user.service'
import { AuthService } from '@/services/auth.service'

import {
  HareWareApi,
  GetAreaListQuery,
  GetBlackListQuery
} from '@/api/v1/setting/hardware'
@Injectable()
export class ListService {
  list$ = new State([])
  page$ = new State([])
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    scanGlobalInfo: 'shop:setting:hardware|global_info',
    scanAreaInfo: 'shop:setting:hardware|area_info',
    globalSet: 'shop:setting:hardware|global_set',
    globalBlackSet: 'shop:setting:hardware|global_black_set',
    areaSet: 'shop:setting:hardware|area_set'
  })
  rule$ = this.userService.getOptions$('setting.entrance.times_card_rules')
  constructor(
    private HareWareApi: HareWareApi,
    private userService: UserService,
    private authService: AuthService
  ) {}
  @Effect()
  getAreaList(query: GetAreaListQuery) {
    return this.HareWareApi.getAreaList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  getGlobalInfo() {
    return this.HareWareApi.getGlobalInfo()
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getAreaList(to.meta.query)
  }
}
