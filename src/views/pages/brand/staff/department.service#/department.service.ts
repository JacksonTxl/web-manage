import { UpdateDepartmentInput, DelDepartmentInput } from '@/api/v1/staff'
import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { tap, switchMap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'

import { StaffApi, AddDepartmentInput } from '@/api/v1/staff'
import { MessageService } from '@/services/message.service'

@Injectable()
export class DepartmentService {
  loading$ = new State({})
  departmentList$ = new State([])
  auth$ = this.authService.authMap$({
    departmentAdd: 'brand:auth:department|add',
    departmentDel: 'brand:auth:department|del',
    departmentEdit: 'brand:auth:department|edit'
  })
  constructor(
    protected staffApi: StaffApi,
    private msg: MessageService,
    private authService: AuthService
  ) {}
  getDepartmentList() {
    return this.staffApi.getDepartmentList().pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.departmentList$.commit(() => res.department)
      })
    )
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
      })
    )
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
      })
    )
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
      })
    )
  }
}
