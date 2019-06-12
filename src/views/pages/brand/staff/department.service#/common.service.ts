import { UserService } from '@/services/user.service'
import { CoachLevelApi } from '@/api/v1/setting/coach/level'
import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'

import {
  StaffApi, PutStaffBrandQuitInput
} from '@/api/v1/staff'
import { forkJoin } from 'rxjs'

interface SetState {
  shopOptions: object[],
}
interface GetOptionsInput {
  func: any,
  payload?: any,
  callback?: any
}
@Injectable()
export class CommonService extends Store<SetState> {
  state$: State<SetState>
  shopOptions$: Computed<object[]>
  constructor(protected staffApi: StaffApi) {
    super()
    this.state$ = new State({
      shopOptions: []
    })
    this.shopOptions$ = new Computed(this.state$.pipe(pluck('shopOptions')))
  }
  /**
    * 获取门店列表 options
    */
  private getShopList() {
    return this.staffApi.getShopList().pipe(tap(res => {
      this.state$.commit(state => {
        state.shopOptions = res.shops
      })
    }))
  }
  /**
   *
   * @param query
   * 获取Options
   */
  action(fun: string, payload?: any, callback?: any) {
    const that = this as any
    return that[fun](payload).subscribe((res: any) => {
      if (!callback) return
      callback(res)
    })
  }
}
