import { Injectable } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { tap, pluck } from 'rxjs/operators'
import { Store } from '@/services/store'

import { forkJoin } from 'rxjs'
import { MessageService } from '@/services/message.service'
import { ShopStaffApi } from '@/api/v1/staff/staff'

interface SetState {
  departmentList: object
}
@Injectable()
export class JoinDepartmentService extends Store<SetState> {
  state$: State<SetState>
  departmentList$: Computed<object>
  constructor(protected staffApi: ShopStaffApi, private msg: MessageService) {
    super()
    this.state$ = new State({
      departmentList: {}
    })
    this.departmentList$ = new Computed(
      this.state$.pipe(pluck('departmentList'))
    )
  }
  getStaffDepartment() {
    return this.staffApi.getStaffDepartmentList().pipe(
      tap(res => {
        this.state$.commit(state => {
          state.departmentList = res.department
        })
      })
    )
  }
  // deleteStaffBrandInfo(params: string) {
  //   return this.staffApi.(params).pipe(tap(res => {
  //     this.msg.success({
  //       content: '已删除！'
  //     })
  //   }))
  // }
}
