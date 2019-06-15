import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberApi } from '@/api/v1/member'
import { UpdateMemberEdit } from '../../../../api/v1/member'

interface EditState {
    info: Object,
    countryInfo: Object,
    nations: Object,
    countryList: Object
}
@Injectable()
export class EditService extends Store<EditState> {
    state$: State<EditState>
    info$: Computed<Object>
    countryInfo$: Computed<Object>
    nations$: Computed<Object>
    countryList$: Computed<Object>
    constructor(protected memberApi: MemberApi) {
      super()
      this.state$ = new State({
        info: {},
        countryInfo: []
      })
      this.info$ = new Computed(this.state$.pipe(pluck('info')))
      this.countryInfo$ = new Computed(this.state$.pipe(pluck('countryInfo')))
      this.nations$ = new Computed(this.state$.pipe(pluck('nations')))
      this.countryList$ = new Computed(this.state$.pipe(pluck('countryList')))
    }
    getMemberEdit(id: number) {
      return this.memberApi.getMemberEdit(id).pipe(
        tap(res => {
          this.state$.commit(state => {
            state.info = res.info
          })
        })
      )
    }
    @Effect()
    getCountries() {
      return this.memberApi.getCountries().pipe(
        tap(res => {
          this.state$.commit(state => {
            state.countryInfo = res.country_info
          })
        })
      )
    }
    getCountryCodes() {
      return this.memberApi.getCountryCodes().pipe(
        tap(res => {
          this.state$.commit(state => {
            state.countryList = res.code_list
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
    updateMemberEdit(id: string, params: UpdateMemberEdit) {
      return this.memberApi.updateMemberEdit(id, params)
    }

    beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
      console.log('to.meta', to.meta)
      const member_id = to.meta.query.id
      this.getCountries().subscribe(() => {})
      this.getNations().subscribe(() => {})
      this.getCountryCodes().subscribe(() => {})
      this.getMemberEdit(member_id).subscribe(() => {
        next()
      }, () => {
        next(false)
      })
    }
}
