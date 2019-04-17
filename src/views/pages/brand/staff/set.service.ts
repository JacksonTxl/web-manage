import { Injectable } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { StaffApi, SaveData, EditStaffBasicInfoQuery } from '@/api/v1/staff'

interface SetState {
    formData: Object,
    countryList: any
}
@Injectable()
export class SetService extends Store<SetState> {
    state$: State<SetState>
    formData$: Computed<Object>
    countryList$: Computed<Object>
    constructor(protected staffApi: StaffApi) {
      super()
      this.state$ = new State({
        formData: {},
        countryList: []
      })
      this.formData$ = new Computed(this.state$.pipe(pluck('formData')))
      this.countryList$ = new Computed(this.state$.pipe(pluck('countryList')))
    }
    // 员工编辑回显
    getStaffBrandReview(id: number) {
      return this.staffApi.getStaffBrandReview(id)
    }
    @Effect()
    // 提交编辑
    updateStaffBrandInfo(params: SaveData) {
      return this.staffApi.updateStaffBrandInfo(params)
    }
    @Effect()
    // 获取手机号区域
    getCountryCodes() {
      return this.staffApi.getCountryCodes().pipe(
        tap(state => {
          this.SET_CODE_LIST(state)
        })
      )
    }
    // 提交员工基础信息修改
    editStaffBasicInfo(id: number, params : EditStaffBasicInfoQuery) {
      return this.staffApi.editStaffBasicInfo(id, params)
    }
    protected SET_CODE_LIST(codeList: any) {
      this.state$.commit(state => {
        state.countryList = codeList
      })
    }
    protected SET_STAFF_BRND(data: SetState) {
      this.state$.commit(state => {
        state.formData = data
      })
    }
}
