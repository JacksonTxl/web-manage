import { UserService } from '@/services/user.service'
import { CoachLevelApi } from '@/api/v1/setting/coach/level'
import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'

import {
  StaffApi,
  PutStaffBrandQuitInput,
  PutStaffBrandRestartInput
} from '@/api/v1/staff'
import { forkJoin } from 'rxjs'
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
