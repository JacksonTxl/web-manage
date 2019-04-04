import { SaveData } from './../../../../api/staff/staff-add'
import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { StaffAddApi } from '@/api/staff/staff-add'
import { tap } from 'rxjs/operators'
import { StaffPubApi } from '@/api/staff/staff-pub'
import { State, Computed, Effect, Action } from 'rx-state'
import { StaffApi } from '@/api/v1/staff'
import { Store } from '@/services/store'
interface CountryCodesState {
  codeList: any
}
@Injectable()
export class AddService extends Store<CountryCodesState> {
  state$: State<CountryCodesState>
  constructor(private staffApi: StaffApi) {
    super()
    this.state$ = new State({
      codeList: []
    })
  }
  @Effect()
  getCountryCodes(query: any) { // 获取国际化手机号前缀
    return this.staffApi.getCountryCodes(query)
  }
  SET_CODE_LIST(codeList: CountryCodesState) {
    this.state$.commit(state => {
      state.codeList = codeList
    })
  }
  save(data: SaveData) {
    return this.staffApi.saveStaffInfo(data)
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
