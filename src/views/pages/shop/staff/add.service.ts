import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { ShopStaffApi } from '@/api/v1/staff/staff'
import { StaffApi } from '@/api/v1/staff'

interface AddState {
    // basicInfo: Object,
    countrylist: Object
}
@Injectable()
export class AddService extends Store<AddState> {
    state$: State<AddState>
    // basicInfo$: Computed<Object>
    countrylist$: Computed<Object>
    constructor(protected shopstaffApi: ShopStaffApi, protected staffApi : StaffApi) {
      super()
      this.state$ = new State({
        countrylist: {}
      })
      this.countrylist$ = new Computed(this.state$.pipe(pluck('countrylist')))
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
}
