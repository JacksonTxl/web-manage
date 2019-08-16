import { Injectable } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { StaffApi, PutStaffBindBankInput } from '@/api/v1/staff'
import { MessageService } from '@/services/message.service'

interface SetState {
  accountInfo: object
}
@Injectable()
export class SalaryAccountSettingService extends Store<SetState> {
  state$: State<SetState>
  accountInfo$: Computed<any>
  constructor(protected staffApi: StaffApi, private msg: MessageService) {
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
