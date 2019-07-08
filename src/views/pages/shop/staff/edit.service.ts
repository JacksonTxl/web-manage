import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { forkJoin } from 'rxjs'
import { tap } from 'rxjs/operators'
import { RoleApi } from '@/api/v1/staff/role'
import { ShopStaffApi } from '@/api/v1/staff/staff'
import {
  StaffApi,
  EditStaffBasicInfoQuery,
  EditStaffDetailInfoQuery,
  EditStaffCoachInfoQuery } from '@/api/v1/staff'

@Injectable()
export class EditService implements RouteGuard {
    staffInfo$ = new State({})
    codeList$ = new State([])
    roleList$ = new State([])
    loading$ = new State({})
    constructor(protected shopStaffApi: ShopStaffApi, protected staffApi: StaffApi, private roleApi: RoleApi) {}
    @Effect()
    // 获取手机号区域
    getCountryCodes() {
      return this.staffApi.getCountryCodes().pipe(
        tap(res => {
          this.codeList$.commit(() => res)
        })
      )
    }

    getNormalList() {
      return this.roleApi.getNormalList().pipe(tap(res => {
        console.log('getNormalList', res)
        this.roleList$.commit(() => res.roles)
      }))
    }

    // 获取编辑回显
    getStaffInfo(id: string) {
      return this.shopStaffApi.editStaffInfo(id).pipe(
        tap(res => {
          this.staffInfo$.commit(() => res.staff_info)
        })
      )
    }

    init(id: string) {
      console.log('init')
      return forkJoin(this.getNormalList(), this.getCountryCodes(), this.getStaffInfo(id))
    }

    // 修改基础信息
    updateBasicInfo(id: string, params: EditStaffBasicInfoQuery) {
      return this.shopStaffApi.updateStaffBasicInfo(id, params)
    }

    // 修改详细信息
    updateDetailedInfo(id: string, params: EditStaffDetailInfoQuery) {
      return this.shopStaffApi.updateStaffDetailedInfo(id, params)
    }

    // 修改教练信息
    updateCoachInfo(id: string, params: EditStaffCoachInfoQuery) {
      return this.shopStaffApi.updateCoachInfo(id, params)
    }

    beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
      const { id } = to.query as any
      return this.init(id)
    }
}
