import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { RoleApi } from '@/api/v1/staff/role'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import {
  StaffApi,
  EditStaffBasicInfoQuery,
  EditStaffDetailInfoQuery,
  EditStaffCoachInfoQuery
} from '@/api/v1/staff'
import { forkJoin } from 'rxjs'

interface EditState {
  staffInfo: Object,
  codeList: Object,
  roleList: object[]
}
@Injectable()
export class EditService extends Store<EditState> {
  state$: State<EditState>
  staffInfo$: Computed<Object>
  codeList$: Computed<Object>
  roleList$: Computed<object[]>
  constructor(protected staffApi: StaffApi, private roleApi: RoleApi) {
    super()
    this.state$ = new State({
      codeList: {},
      staffInfo: {}
    })
    this.codeList$ = new Computed(this.state$.pipe(pluck('codeList')))
    this.staffInfo$ = new Computed(this.state$.pipe(pluck('staffInfo')))
    this.roleList$ = new Computed(this.state$.pipe(pluck('roleList')))
  }
  @Effect()
  // 获取手机号区域
  getCountryCodes() {
    return this.staffApi.getCountryCodes().pipe(
      tap(res => {
        this.state$.commit(state => {
          state.codeList = res
        })
      })
    )
  }
  getNormalList() {
    return this.roleApi.getNormalList().pipe(tap(res => {
      this.state$.commit(state => {
        state.roleList = res.roles
      })
    }))
  }

  // 获取编辑回显
  editStaffInfo(id: string) {
    return this.staffApi.editStaffInfo(id).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.staffInfo = res.staff_info
        })
      })
    )
  }

  // 修改基础信息
  updateBasicInfo(id: number, params: EditStaffBasicInfoQuery) {
    return this.staffApi.updateStaffBasicInfo(id, params)
  }

  // 修改详细信息
  updateDetailedInfo(id: number, params: EditStaffDetailInfoQuery) {
    return this.staffApi.updateStaffDetailInfo(id, params)
  }

  // 修改教练信息
  updateCoachInfo(id: number, params: EditStaffCoachInfoQuery) {
    return this.staffApi.updateStaffCoachInfo(id, params)
  }

  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    const { id } = to.query as any
    forkJoin(this.getNormalList(), this.editStaffInfo(id)).subscribe(() => {
      next()
    })
  }
}
