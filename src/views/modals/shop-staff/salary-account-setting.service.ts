import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'

import {
  ShopStaffApi,
  PutStaffBrandQuitInput,
  PutStaffBindBankInput
} from '@/api/v1/staff/staff'

import { forkJoin } from 'rxjs'
import { MessageService } from '@/services/message.service'

interface SetState {
  accountInfo: object
}
@Injectable()
export class SalaryAccountSettingService extends Store<SetState> {
  state$: State<SetState>
  accountInfo$: Computed<any>
  constructor(protected staffApi: ShopStaffApi, private msg: MessageService) {
    super()
    this.state$ = new State({
      accountInfo: {}
    })
    this.accountInfo$ = new Computed(this.state$.pipe(pluck('accountInfo')))
  }
  getBankInfo(id: string) {
    return this.staffApi.getBankInfo(id).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.accountInfo = res.bank
        })
      })
    )
  }
  putStaffBindBank(params: PutStaffBindBankInput) {
    return this.staffApi.putStaffBindBank(params).pipe(
      tap(res => {
        this.msg.success({
          content: '员工银行账户设置成功'
        })
      })
    )
  }
}
