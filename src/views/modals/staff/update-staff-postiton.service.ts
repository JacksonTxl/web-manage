import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'

import {
  StaffApi
} from '@/api/v1/staff'

interface SetState {
    formData: Object
}
@Injectable()
export class Updatepostion extends Store<SetState> {
    state$: State<SetState>
    formData$: Computed<Object>
    constructor(protected staffapi: StaffApi) {
      super()
      this.state$ = new State({
        formData: {}
      })
      this.formData$ = new Computed(this.state$.pipe(pluck('formData')))
    }

    // 员工更改职位回显
    updateStaffPostion(id: string) {
      return this.staffapi.updateStaffPostion(id)
    }

    // 提交职位修改
    bindStaffPostion(id: string, params: object) {
      return this.staffapi.bindStaffPostion(id, params)
    }
    protected SET_STAFF_BRND(data: SetState) {
      this.state$.commit(state => {
        state.formData = data
      })
    }
}
