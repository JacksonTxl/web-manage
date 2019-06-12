import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { Store } from '@/services/store'

import {
  StaffApi, PutStaffBrandQuitInput, RePasswordInput
} from '@/api/v1/staff'
import { tap } from 'rxjs/operators'

interface SetState {
  rePasswordInfo: object,
}
@Injectable()
export class RePasswordService extends Store<SetState> {
  state$: State<SetState>
  constructor(protected staffApi: StaffApi) {
    super()
    this.state$ = new State({
      rePasswordInfo: {}
    })
  }
  /**
   *  获取修改密码信息
   */
  getRePassword(id: string) {
    return this.staffApi.getRePassword(id).pipe(tap(res => {
      this.state$.commit(state => {
        state.rePasswordInfo = res.info
      })
    }))
  }
  /**
   *
   * @param params
   * 新建账号
   */
  setAccount(params: RePasswordInput) {
    return this.staffApi.setAccount(params)
  }
  /**
   *
   * @param params
   * 充值密码
   */
  rePassword(params: RePasswordInput) {
    return this.staffApi.rePassword(params)
  }
}
