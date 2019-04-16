import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { pluck } from 'rxjs/operators'
import { State, Computed, Effect, Action } from 'rx-state'
import { StaffApi, SaveData } from '@/api/v1/staff'
import { Store } from '@/services/store'
interface CountryCodesState {
  codeList: any
}
@Injectable()
export class AddService extends Store<CountryCodesState> {
  state$: State<CountryCodesState>
  codeList$: Computed<any>
  constructor(private staffApi: StaffApi) {
    super()
    this.state$ = new State({
      codeList: []
    })
    this.codeList$ = new Computed(this.state$.pipe(pluck('codeList')))
  }
  @Effect()
  getCountryCodes(query: any) { // 获取国际化手机号前缀
    return this.staffApi.getCountryCodes()
  }
  SET_CODE_LIST(codeList: CountryCodesState) {
    this.state$.commit(state => {
      state.codeList = codeList
    })
  }
  save(data: SaveData) {
    return this.staffApi.addStaffBrandInfo(data)
  }

  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    const query = { q: 2 }
    this.getCountryCodes(query).subscribe(res => {
      console.log(res)
      this.SET_CODE_LIST(res.code_list)
    })
    next()
  }
}
