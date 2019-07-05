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

interface SetState {
  positionInfo: object,
  staffEnums: object,
  coachLevelList: object[],
  salaryBasic: any[],
  salarySale: any[]
  salaryCourse: any[]
}
@Injectable()
export class UpdateStaffPositionService extends Store<SetState> {
  state$: State<SetState>
  positionInfo$: Computed<object>
  coachLevelList$: Computed<object[]>
  staffEnums$: Computed<object>
  salaryBasic$: Computed<any[]>
  salarySale$: Computed<any[]>
  salaryCourse$: Computed<any[]>
  constructor(protected staffApi: StaffApi, private coachLevel: CoachLevelApi, private userService: UserService, private msg: MessageService) {
    super()
    this.state$ = new State({
      positionInfo: {},
      coachLevelList: [],
      staffEnums: {},
      salaryBasic: [],
      salarySale: [],
      salaryCourse: []
    })
    this.positionInfo$ = new Computed(this.state$.pipe(pluck('positionInfo')))
    this.coachLevelList$ = new Computed(this.state$.pipe(pluck('coachLevelList')))
    this.staffEnums$ = this.userService.staffEnums$
    this.salaryBasic$ = new Computed(this.state$.pipe(pluck('salaryBasic')))
    this.salarySale$ = new Computed(this.state$.pipe(pluck('salarySale')))
    this.salaryCourse$ = new Computed(this.state$.pipe(pluck('salaryCourse')))
  }
  getCoachLevel() {
    return this.coachLevel.getCoachLevelListAll().pipe(tap(res => {
      console.log(res)
      this.state$.commit(state => {
        state.coachLevelList = res.list
      })
    }))
  }
  getStaffSalaryBasic() {
    return this.staffApi.getStaffSalaryBasic().pipe(tap(res => {
      this.state$.commit(state => {
        state.salaryBasic = res.basic_templates
      })
    }))
  }
  getStaffSalarySale() {
    return this.staffApi.getStaffSalarySale().pipe(tap(res => {
      this.state$.commit(state => {
        state.salarySale = res.sale_templates
      })
    }))
  }
  getStaffSalaryCourse() {
    return this.staffApi.getStaffSalaryCourse().pipe(tap(res => {
      this.state$.commit(state => {
        state.salaryCourse = res.course_templates
      })
    }))
  }
  // 员工更改职位回显
  getStaffBrandPosition(id: string) {
    return this.staffApi.getStaffBrandPosition({ id }).pipe(tap(res => {
      this.state$.commit(state => {
        console.log('getStaffBrandPosition')
        state.positionInfo = res.position
      })
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
  validatStaffPosition(id: number) {
    return this.staffApi.validatStaffPosition(id)
  }
}
