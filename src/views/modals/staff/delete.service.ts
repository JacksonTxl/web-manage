import { Injectable } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { tap, pluck } from 'rxjs/operators'
import { Store } from '@/services/store'

import { StaffApi } from '@/api/v1/staff'
import { MessageService } from '@/services/message.service'

@Injectable()
export class DeleteService {
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
  deleteStaffBrandInfo(params: string) {
    return this.staffApi.deleteStaffBrandInfo(params).pipe(
      tap(res => {
        this.msg.success({
          content: '已删除！'
        })
      })
    )
  }
}
