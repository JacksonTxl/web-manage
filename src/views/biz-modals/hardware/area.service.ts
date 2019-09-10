import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { UserService } from '@/services/user.service'
import {
  HareWareApi,
  GetWhiteListQuery,
  PutAreaSettingParams,
  GetAreaInfoQuery
} from '@/api/v1/setting/hardware'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'

@Injectable()
export class AreaService {
  loading$ = new State({})
  rule$ = this.userService.getOptions$('setting.entrance.entry_limit')
  info$ = new State({})
  list$ = new State({})
  whiteList$ = new State([])
  constructor(
    private HareWareApi: HareWareApi,
    private userService: UserService
  ) {}
  @Effect()
  getSingleAreaList() {
    return this.HareWareApi.getSingleAreaList().pipe(
      tap(res => {
        this.list$.commit(() => res.list)
      })
    )
  }
  getWhiteList(query: GetWhiteListQuery) {
    return this.HareWareApi.getWhiteList(query).pipe(
      tap(res => {
        this.whiteList$.commit(() => res.list)
      })
    )
  }
  putAreaSetting(params: PutAreaSettingParams) {
    return this.HareWareApi.putAreaSettingParams(params)
  }
  getAreaInfo(query: GetAreaInfoQuery) {
    return this.HareWareApi.getAreaInfo(query).pipe(
      tap(res => {
        this.info$.commit(() => res.info)
      })
    )
  }
  @Effect()
  init(GetAreaInfoQuery: any) {
    return forkJoin(
      this.getSingleAreaList(),
      this.getAreaInfo(GetAreaInfoQuery)
    )
  }
}
