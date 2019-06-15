import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberApi } from '@/api/v1/member'
import { StaffApi } from '../../../../api/v1/staff'
import { AddUserParams } from '../../../../api/v1/member'

interface AddState {
    countryInfo: Object,
    nations: Object,
    countryList: Object
}
@Injectable()
export class AddService extends Store<AddState> {
    state$: State<AddState>
    countryInfo$: Computed<Object>
    nations$: Computed<Object>
    countryList$: Computed<Object>
    constructor(protected memberApi: MemberApi, protected staffApi: StaffApi) {
      super()
      this.state$ = new State({
        info: {},
        countryInfo: [],
        countryList: []
      })
      this.countryInfo$ = new Computed(this.state$.pipe(pluck('countryInfo')))
      this.nations$ = new Computed(this.state$.pipe(pluck('nations')))
      this.countryList$ = new Computed(this.state$.pipe(pluck('countryList')))
    }

    getCountryCodes() {
      return this.staffApi.getCountryCodes().pipe(
        tap(res => {
          this.state$.commit(state => {
            state.countryList = res
          })
        })
      )
    }
    getCountries() {
      return this.memberApi.getCountries().pipe(
        tap(res => {
          this.state$.commit(state => {
            state.countryInfo = res.country_info
          })
        })
      )
    }
    getNations() {
      return this.memberApi.getNations().pipe(
        tap(res => {
          this.state$.commit(state => {
            state.nations = res.nation_info
          })
        })
      )
    }

    addUser(params: AddUserParams) {
      return this.memberApi.addUser(params)
    }
    beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
      console.log('to.meta', to.meta)
      this.getCountries().subscribe(() => { })
      this.getNations().subscribe(() => { })
      this.getCountryCodes().subscribe(() => {})
      next()
    }
}
