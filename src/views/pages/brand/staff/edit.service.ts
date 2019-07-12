import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { RoleApi } from '@/api/v1/staff/role'
import { ShopStaffApi } from '@/api/v1/staff/staff'
import { tap } from 'rxjs/operators'
import {
  StaffApi,
  EditStaffBasicInfoQuery,
  EditStaffDetailInfoQuery,
  EditStaffCoachInfoQuery
} from '@/api/v1/staff'
import { forkJoin } from 'rxjs'

@Injectable()
export class EditService implements RouteGuard {
  staffInfo$ = new State([])
  codeList$ = new State([])
  roleList$ = new State([])
  staffSpecialty$ = new State([])
  loading$ = new State({})
  constructor(protected staffApi: StaffApi, protected shopStaffApi: ShopStaffApi, private roleApi: RoleApi) {}
  @Effect()
  // 获取手机号区域
  getCountryCodes() {
    return this.staffApi.getCountryCodes().pipe(
      tap(res => {
        this.codeList$.commit(() => {
          let code_list = res.code_list
          if (code_list.length) return code_list
          code_list.push({
            phone_code: res.default_code,
            code_id: res.default_code_id
          })
          return code_list
        })
      })
    )
  }
  getNormalList() {
    return this.roleApi.getNormalList().pipe(tap(res => {
      this.roleList$.commit(() => res.roles)
    }))
  }

  // 获取编辑回显
  editStaffInfo(id: string) {
    return this.staffApi.editStaffInfo(id).pipe(
      tap(res => {
        this.staffInfo$.commit(() => res.staff_info)
      })
    )
  }

  // 获取员工擅长信息
  getStaffSpecialty() {
    return this.shopStaffApi.getStaffSpecialty().pipe(
      tap(res => {
        console.log('getStaffSpecialty', res)
        this.staffSpecialty$.commit(() => res)
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

  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    const { id } = to.query as any
    return forkJoin(this.getStaffSpecialty(), this.getNormalList(), this.getCountryCodes(), this.editStaffInfo(id))
  }
}
