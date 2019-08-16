import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { StaffApi, PutStaffBrandQuitInput } from '@/api/v1/staff'
import { MessageService } from '@/services/message.service'

@Injectable()
export class TurnoverService {
  list$ = new State([])
  operate$ = new State({})
  loading$ = new State({})
  constructor(protected staffApi: StaffApi, private msg: MessageService) {}
  getStaffCheckJob(id: string) {
    return this.staffApi.getStaffCheckJob(id).pipe(
      tap(res => {
        this.list$.commit(() => {
          return res.list.filter((item: any) => item.num !== 0)
        })
        this.operate$.commit(() => res.operate)
      })
    )
  }
  @Effect()
  putStaffBrandQuit(params: PutStaffBrandQuitInput) {
    return this.staffApi.putStaffBrandQuit(params).pipe(
      tap(res => {
        this.msg.success({
          content: '员工已离职'
        })
      })
    )
  }
}
