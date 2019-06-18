import { UpdateDepartmentInput, DelDepartmentInput } from './../../../../../api/v1/staff'
import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap, switchMap } from 'rxjs/operators'
import { Store } from '@/services/store'

import {
  StaffApi,
  AddDepartmentInput
} from '@/api/v1/staff'
import { MessageService } from '@/services/message.service'

interface SetState {
  departmentList: object[],
}
interface GetOptionsInput {
  func: any,
  payload?: any,
  callback?: any
}
@Injectable()
export class DepartmentService extends Store<SetState> {
  state$: State<SetState>
  departmentList$: Computed<object[]>
  constructor(protected staffApi: StaffApi, private msg: MessageService) {
    super()
    this.state$ = new State({
      departmentList: []
    })
    this.departmentList$ = new Computed(this.state$.pipe(pluck('departmentList')))
  }
  getDepartmentList() {
    return this.staffApi.getDepartmentList().pipe(tap(res => {
      this.state$.commit(state => {
        state.departmentList = res.department
      })
    }))
  }
  addDepartment(params: AddDepartmentInput) {
    return this.staffApi.addDepartment(params).pipe(
      switchMap(() => {
        return this.getDepartmentList()
      }),
      tap(res => {
        this.msg.success({
          content: '添加成功！！！'
        })
      }))
  }
  updateDepartment(params: UpdateDepartmentInput) {
    return this.staffApi.updateDepartment(params).pipe(
      switchMap(() => {
        return this.getDepartmentList()
      }),
      tap(res => {
        this.msg.success({
          content: '修改成功！！！'
        })
      }))
  }
  delDepartment(params: DelDepartmentInput) {
    return this.staffApi.delDepartment(params).pipe(
      switchMap(() => {
        return this.getDepartmentList()
      }),
      tap(res => {
        this.msg.success({
          content: '部门已删除'
        })
      }))
  }
}
