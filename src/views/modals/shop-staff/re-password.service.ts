import { ShopStaffApi, PutStaffBrandQuitInput, RePasswordInput } from '@/api/v1/staff/staff'
import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { Store } from '@/services/store'

import { tap } from 'rxjs/operators'
import { MessageService } from '@/services/message.service'

interface SetState {
  rePasswordInfo: object,
}
@Injectable()
export class RePasswordService extends Store<SetState> {
  state$: State<SetState>
  constructor(protected staffApi: ShopStaffApi, private msg: MessageService) {
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
    return this.staffApi.setAccount(params).pipe(tap(res => {
      this.msg.success({
        content: '创建账号成功'
      })
    }))
  }
  /**
   *
   * @param params
   * 充值密码
   */
  rePassword(params: RePasswordInput) {
    return this.staffApi.rePassword(params).pipe(tap(res => {
      this.msg.success({
        content: '修改密码成功'
      })
    }))
  }
}
