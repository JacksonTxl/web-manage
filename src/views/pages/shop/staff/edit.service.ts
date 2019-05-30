import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { ShopStaffApi } from '@/api/v1/staff/staff'
import {
  StaffApi,
  EditStaffBasicInfoQuery,
  EditStaffDetailInfoQuery,
  EditStaffCoachInfoQuery } from '@/api/v1/staff'

interface EditState {
    staffInfo: Object,
    countrylist: Object
}
@Injectable()
export class EditService extends Store<EditState> {
    state$: State<EditState>
    staffInfo$: Computed<Object>
    countrylist$: Computed<Object>
    constructor(protected shopstaffApi: ShopStaffApi, protected staffApi : StaffApi) {
      super()
      this.state$ = new State({
        countrylist: {},
        staffInfo: {}
      })
      this.countrylist$ = new Computed(this.state$.pipe(pluck('countrylist')))
      this.staffInfo$ = new Computed(this.state$.pipe(pluck('staffInfo')))
    }
    @Effect()
    // 获取手机号区域
    getCountryCodes() {
      return this.staffApi.getCountryCodes().pipe(
        tap(res => {
          this.state$.commit(state => {
            state.countrylist = res
          })
        })
      )
    }

    // 获取编辑回显
    getStaffInfo(id: string) {
      return this.shopstaffApi.editStaffInfo(id).pipe(
        tap(res => {
          this.state$.commit(state => {
            state.staffInfo = res.staff_info
          })
        })
      )
    }

    // 修改基础信息
    updateBasicInfo(id: string, params: EditStaffBasicInfoQuery) {
      return this.shopstaffApi.updateStaffBasicInfo(id, params)
    }

    // 修改详细信息
    updateDetailedInfo(id: string, params: EditStaffDetailInfoQuery) {
      return this.shopstaffApi.updateStaffDetailedInfo(id, params)
    }

    // 修改教练信息
    updateCoachInfo(id: string, params: EditStaffCoachInfoQuery) {
      return this.shopstaffApi.updateCoachInfo(id, params)
    }

    beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
      const { id } = to.meta.query
      this.getStaffInfo(id).subscribe(() => {
        next()
      })
    }
}
