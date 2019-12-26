import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'

import { StaffApi } from '@/api/v1/staff'

interface SetState {
  shopOptions: object[]
}

@Injectable()
export class CommonService {
  loading$ = new State({})
  shopOptions$ = new State([])
  constructor(protected staffApi: StaffApi) {}
  /**
   * 获取门店列表 options
   */
  getShopList() {
    return this.staffApi.getShopList().pipe(
      tap(res => {
        this.shopOptions$.commit(() => res.shops)
      })
    )
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
