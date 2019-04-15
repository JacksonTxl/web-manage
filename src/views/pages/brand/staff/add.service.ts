import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { pluck, tap } from 'rxjs/operators'
import { State, Computed, Effect, Action } from 'rx-state'
import { StaffApi, SaveData } from '@/api/v1/staff'
import { Store } from '@/services/store'
interface CountryCodesState {
  codeList: any,
  defaultCode: any
}
@Injectable()
export class AddService extends Store<CountryCodesState> {
  state$: State<CountryCodesState>
  codeList$: Computed<any>
  defaultCode$: Computed<any>
  constructor(private staffApi: StaffApi) {
    super()
    this.state$ = new State({
      codeList: [],
      defaultCode: ''
    })
    this.codeList$ = new Computed(this.state$.pipe(pluck('codeList')))
    this.defaultCode$ = new Computed(this.state$.pipe(pluck('codeList')))
  }
  @Effect()
  getCountryCodes(query: any) { // 获取国际化手机号前缀
    return this.staffApi.getCountryCodes(query).pipe(
      tap(state => {
        this.SET_CODE_LIST(state.code_list)
        this.SET_DEFAULT_CODE(state.default_code)
      })
    )
  }
  SET_CODE_LIST(codeList: CountryCodesState) {
    this.state$.commit(state => {
      state.codeList = codeList
    })
  }
  SET_DEFAULT_CODE(defaultCode: string) {
    this.state$.commit(state => {
      state.defaultCode = defaultCode
    })
  }
  save(data: SaveData) {
    return this.staffApi.addStaffBrandInfo(data)
  }

  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    const query = { q: 2 }
    this.getCountryCodes(query).subscribe(res => {
    })
    next()
  }
}
