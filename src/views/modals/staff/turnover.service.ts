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
import { MessageService } from '@/services/message.service'

interface SetState {
  conditionDeleteInfo: object
}
@Injectable()
export class TurnoverService extends Store<SetState> {
  state$: State<SetState>
  conditionDeleteInfo$: Computed<object>
  constructor(protected staffApi: StaffApi, private msg: MessageService) {
    super()
    this.state$ = new State({
      conditionDeleteInfo: {}
    })
    this.conditionDeleteInfo$ = new Computed(this.state$.pipe(pluck('conditionDeleteInfo')))
  }
  getStaffCheckJob(id: string) {
    return this.staffApi.getStaffCheckJob(id).pipe(tap(res => {
      this.state$.commit(state => {
        state.conditionDeleteInfo = res
      })
    }))
  }
  putStaffBrandQuit(params: PutStaffBrandQuitInput) {
    return this.staffApi.putStaffBrandQuit(params).pipe(tap(res => {
      this.msg.success({
        content: '员工已离职'
      })
    }))
  }
}
