import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'

import { StaffApi, RePasswordInput } from '@/api/v1/staff'
import { tap } from 'rxjs/operators'
import { MessageService } from '@/services/message.service'

@Injectable()
export class RePasswordService {
  rePasswordInfo$ = new State({})
  loading$ = new State({})
  constructor(protected staffApi: StaffApi, private msg: MessageService) {}
  /**
   *  获取修改密码信息
   */
  @Effect()
  getRePassword(id: string) {
    return this.staffApi.getRePassword(id).pipe(tap(res => {
      this.rePasswordInfo$.commit(() => res.account)
    }))
  }
  /**
   *
   * @param params
   * 新建账号
   */
  @Effect()
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
