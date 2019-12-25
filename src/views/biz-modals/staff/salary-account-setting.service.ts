import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { StaffApi, PutStaffBindBankInput } from '@/api/v1/staff'
import { MessageService } from '@/services/message.service'

@Injectable()
export class SalaryAccountSettingService {
  accountInfo$ = new State({})
  constructor(protected staffApi: StaffApi, private msg: MessageService) {}
  getBankInfo(id: string) {
    return this.staffApi.getBankInfo(id).pipe(
      tap(res => {
        this.accountInfo$.commit(() => res.bank)
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
