import { Injectable } from 'vue-service-app'
import { tap } from 'rxjs/operators'

import { StaffApi, PutStaffBrandRestartInput } from '@/api/v1/staff'
import { MessageService } from '@/services/message.service'

interface SetState {
  positionInfo: object
  staffEnums: object
  coachLevelList: object[]
  conditionDeleteInfo: object
}
@Injectable()
export class ReinstatementService {
  constructor(protected staffApi: StaffApi, private msg: MessageService) {}
  putStaffBrandRestart(params: PutStaffBrandRestartInput) {
    return this.staffApi.putStaffBrandRestart(params).pipe(
      tap(res => {
        this.msg.success({
          content: '员工复职成功'
        })
      })
    )
  }
}
