import { RoleApi } from '@/api/v1/staff/role'
import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { ShopStaffApi } from '@/api/v1/staff/staff'
import { StaffApi, AddStaffBasicInfoParams } from '@/api/v1/staff'
import { forkJoin } from 'rxjs'

interface AddState {
  // basicInfo: Object,
  codeList: Object,
  roleList: object[],
  department: []
}
@Injectable()
export class AddService extends Store<AddState> {
  state$: State<AddState>
  // basicInfo$: Computed<Object>
  codeList$: Computed<Object>
  roleList$: Computed<object[]>
  department$: Computed<object[]>
  constructor(protected shopStaffApi: ShopStaffApi, protected staffApi: StaffApi, private roleApi: RoleApi) {
    super()
    this.state$ = new State({
      codeList: {},
      roleList: [],
      department: []
    })
    this.codeList$ = new Computed(this.state$.pipe(pluck('codeList')))
    this.roleList$ = new Computed(this.state$.pipe(pluck('roleList')))
    this.department$ = new Computed(this.state$.pipe(pluck('department')))
  }
  @Effect()
  // 获取手机号区域
  getCountryCodes() {
    return this.staffApi.getCountryCodes().pipe(
      tap(res => {
        this.state$.commit(state => {
          state.codeList = res.code_list
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
  getStaffDepartment() {
    return this.shopStaffApi.getStaffDepartmentList().pipe(
      tap(res => {
        this.state$.commit(state => {
          state.department = res.department
        })
      })
    )
  }
  addStaff(params: AddStaffBasicInfoParams) {
    return this.staffApi.addStaffBasicInfo(params)
  }
  init() {
    return forkJoin(this.getNormalList(), this.getCountryCodes(), this.getStaffDepartment())
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.init().subscribe(() => {
      next()
    })
  }
}
