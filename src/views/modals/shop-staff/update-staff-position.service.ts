import { MessageService } from './../../../services/message.service'
import { UserService } from '@/services/user.service'
import { CoachLevelApi } from '@/api/v1/setting/coach/level'
import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'

import {
  StaffApi, PutStaffBindBankInput, PutStaffBindPositionInput
} from '@/api/v1/staff'
import { forkJoin } from 'rxjs'

@Injectable()
export class UpdateStaffPositionService {
  positionInfo$ = new State({})
  coachLevelList$ = new State([])
  staffEnums$ = new State([])
  salaryBasic$ = new State([])
  salarySale$ = new State([])
  salaryCourse$ = new State([])
  constructor(protected staffApi: StaffApi, private coachLevel: CoachLevelApi, private userService: UserService, private msg: MessageService) {}
  getCoachLevel() {
    return this.coachLevel.getCoachLevelListAll().pipe(tap(res => {
      console.log(res)
      this.coachLevelList$.commit(() => res.list)
    }))
  }
  getStaffSalaryBasic() {
    return this.staffApi.getStaffSalaryBasic().pipe(tap(res => {
      this.salaryBasic$.commit(() => {
        return [{ id: 0, name: '请选择' }, ...res.basic_templates]
      })
    }))
  }
  getStaffSalarySale() {
    return this.staffApi.getStaffSalarySale().pipe(tap(res => {
      this.salarySale$.commit(() => {
        return [{ id: 0, name: '请选择' }, ...res.sale_templates]
      })
    }))
  }
  getStaffSalaryCourse() {
    return this.staffApi.getStaffSalaryCourse().pipe(tap(res => {
      this.salaryCourse$.commit(() => {
        return [{ id: 0, name: '请选择' }, ...res.course_templates]
      })
    }))
  }
  // 员工更改职位回显
  getStaffBrandPosition(id: string) {
    return this.staffApi.getStaffBrandPosition({ id }).pipe(tap(res => {
      this.positionInfo$.commit(() => res.position)
    }))
  }
  init(id: string) {
    return forkJoin(this.getStaffBrandPosition(id), this.getCoachLevel(), this.getStaffSalaryCourse(), this.getStaffSalaryBasic(), this.getStaffSalarySale())
  }

  // 提交职位修改
  putStaffBindPosition(params: PutStaffBindPositionInput) {
    return this.staffApi.putStaffBindPosition(params).pipe(tap(res => {
      this.msg.success({
        content: '提交成功'
      })
    }))
  }
  @Effect()
  validatStaffPosition(staff_id: number, id: number) {
    return this.staffApi.validatStaffPosition(staff_id, id)
  }
}
