import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { RoleApi } from '@/api/v1/staff/role'
import { ShopStaffApi } from '@/api/v1/staff/staff'
import {
  StaffApi,
  EditStaffBasicInfoQuery,
  EditStaffDetailInfoQuery,
  EditStaffCoachInfoQuery } from '@/api/v1/staff'

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
    roleList$: Computed<object>
    constructor(protected shopStaffApi: ShopStaffApi, protected staffApi: StaffApi, private roleApi: RoleApi) {
      super()
      this.state$ = new State({
        codeList: {},
        roleList: [],
        staffInfo: {}
      })
      this.roleList$ = new Computed(this.state$.pipe(pluck('codeList')))
      this.codeList$ = new Computed(this.state$.pipe(pluck('codeList')))
      this.staffInfo$ = new Computed(this.state$.pipe(pluck('staffInfo')))
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
    getStaffInfo(id: string) {
      return this.shopStaffApi.editStaffInfo(id).pipe(
        tap(res => {
          this.state$.commit(state => {
            state.staffInfo = res.staff_info
          })
        })
      )
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

    beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
      const { id } = to.query as any
      this.getStaffInfo(id).subscribe(() => {
        next()
      })
    }
}
