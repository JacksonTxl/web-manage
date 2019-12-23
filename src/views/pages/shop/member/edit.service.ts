import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberApi } from '@/api/v1/member'
import { UpdateMemberEdit } from '../../../../api/v1/member'
import { forkJoin } from 'rxjs'
import { UserService } from '@/services/user.service'

interface EditState {
  info: Object
  parent_info: Object
  countryInfo: Object
  nations: Object
  countryList: Object
}
@Injectable()
export class EditService extends Store<EditState> {
  state$: State<EditState>
  info$: Computed<Object>
  parent_info$: Computed<Object>
  countryInfo$: Computed<Object>
  nations$: Computed<Object>
  countryList$: Computed<Object>
  constructor(
    protected memberApi: MemberApi,
    private userService: UserService
  ) {
    super()
    this.state$ = new State({
      info: {},
      parent_info: {},
      countryInfo: []
    })
    this.info$ = new Computed(this.state$.pipe(pluck('info')))
    this.parent_info$ = new Computed(this.state$.pipe(pluck('parent_info')))
    this.countryInfo$ = new Computed(this.state$.pipe(pluck('countryInfo')))
    this.nations$ = new Computed(this.state$.pipe(pluck('nations')))
    this.countryList$ = new Computed(this.state$.pipe(pluck('countryList')))
  }
  minorsType$ = this.userService.getOptions$('small_course.minors_type')
  parentType$ = this.userService.getOptions$('small_course.parent_type')
  getMemberEdit(id: number) {
    return this.memberApi.getMemberEdit(id).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.info = res.info
          state.parent_info = res.parent_info
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
          state.countryList = res
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
  @Effect()
  updateMemberEdit(id: string, params: UpdateMemberEdit) {
    return this.memberApi.updateMemberEdit(id, params)
  }
  serviceInit(member_id: number) {
    return forkJoin(
      this.getCountries(),
      this.getNations(),
      this.getCountryCodes(),
      this.getMemberEdit(member_id)
    )
  }

  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    // const member_id = to.meta.query.id
    // this.getCountries().subscribe(() => {})
    // this.getNations().subscribe(() => {})
    // this.getCountryCodes().subscribe(() => {})
    // this.getMemberEdit(member_id).subscribe(() => {
    //   next()
    // }, () => {
    //   next(false)
    // })
    next()
  }
}
