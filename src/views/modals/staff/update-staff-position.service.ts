import { UserService } from '@/services/user.service'
import { CoachLevelApi } from '@/api/v1/setting/coach/level'
import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'

import {
  StaffApi
} from '@/api/v1/staff'
import { forkJoin } from 'rxjs'

interface SetState {
    positionInfo: object,
    staffEnums: object,
    coachLevelList: object[]
}
@Injectable()
export class UpdateStaffPositionService extends Store<SetState> {
  state$: State<SetState>
  positionInfo$: Computed<object>
  coachLevelList$: Computed<object[]>
  staffEnums$: Computed<object>
  constructor(protected staffApi: StaffApi, private coachLevel: CoachLevelApi, private userService: UserService) {
    super()
    this.state$ = new State({
      positionInfo: {},
      coachLevelList: [],
      staffEnums: {}
    })
    this.positionInfo$ = new Computed(this.state$.pipe(pluck('positionInfo')))
    this.coachLevelList$ = new Computed(this.state$.pipe(pluck('coachLevelList')))
    this.staffEnums$ = new Computed(this.state$.pipe(pluck('staffEnums')))
  }
  GET_STAFF_ENUM() {
    this.state$.commit(state => {
      state.staffEnums = this.userService.staffEnums$
    })
  }
  getCoachLevel() {
    return this.coachLevel.getCoachLevelListAll().pipe(tap(res => {
      console.log(res)
      this.state$.commit(state => {
        state.coachLevelList = res.levels
      })
    }))
  }

  // 员工更改职位回显
  getStaffBrandPosition(id: string) {
    return this.staffApi.getStaffBrandPosition({ id }).pipe(tap(res => {
      console.log(res)
      this.state$.commit(state => {
        state.positionInfo = res.position
      })
    }))
  }
  init(id: string) {
    this.GET_STAFF_ENUM()
    return forkJoin(this.getStaffBrandPosition(id), this.getCoachLevel())
  }

  // 提交职位修改
  bindStaffPosition(id: string, params: object) {
    return this.staffApi.bindStaffPosition(id, params)
  }
}
