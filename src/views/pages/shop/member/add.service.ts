import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { MemberApi } from '@/api/v1/member'
import { UserService } from '@/services/user.service'
import { StaffApi } from '@/api/v1/staff'
import { AddUserParams } from '@/api/v1/member'
import { anyAll } from '@/operators'

@Injectable()
export class AddService {
  loading = new State({})
  countryInfo$ = new State({})
  nations$ = new State([])
  countryList$ = new State([])
  parent_info$ = new State({})
  minorsType$ = this.userService.getOptions$('small_course.minors_type')
  parentType$ = this.userService.getOptions$('small_course.parent_type')
  constructor(
    protected memberApi: MemberApi,
    protected staffApi: StaffApi,
    private userService: UserService
  ) {}

  getCountryCodes() {
    return this.staffApi.getCountryCodes().pipe(
      tap(res => {
        this.countryList$.commit(() => res)
      })
    )
  }
  getCountries() {
    return this.memberApi.getCountries().pipe(
      tap(res => {
        this.countryInfo$.commit(() => res.country_info)
      })
    )
  }
  getNations() {
    return this.memberApi.getNations().pipe(
      tap(res => {
        this.nations$.commit(() => res.nation_info)
      })
    )
  }
  getParentInfoByPhone(params: any) {
    return this.memberApi.getParentInfoByPhone(params)
  }
  addUser(params: AddUserParams) {
    return this.memberApi.addUser(params)
  }
  init() {
    return anyAll(
      this.getCountries(),
      this.getNations(),
      this.getCountryCodes()
    )
  }
  beforeRouteEnter() {
    return this.init()
  }
}
