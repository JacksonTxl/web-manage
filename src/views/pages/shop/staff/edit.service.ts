import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { ShopStaffApi } from '@/api/v1/staff/staff'
import { StaffApi } from '@/api/v1/staff'

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
    getStaffInfo(id: number) {
      return this.staffApi.getStaffBrandReview(id).pipe(
        tap(res => {
          this.state$.commit(state => {
            state.staffInfo = res
          })
        })
      )
    }

    beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
      // console.log('====',to.meta.query)
      const { id } = to.meta.query
      // next()
      this.getStaffInfo(id).subscribe(() => {
        next()
      })
    }
}
