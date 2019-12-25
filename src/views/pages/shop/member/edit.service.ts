import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { MemberApi, UpdateMemberEdit } from '@/api/v1/member'
import { forkJoin } from 'rxjs'

@Injectable()
export class EditService implements Controller {
  loading$ = new State({})
  info$ = new State({})
  countryInfo$ = new State({})
  nations$ = new State([])
  countryList$ = new State([])
  constructor(protected memberApi: MemberApi) {}
  getMemberEdit(id: number) {
    return this.memberApi.getMemberEdit(id).pipe(
      tap(res => {
        this.info$.commit(() => res.info)
      })
    )
  }
  @Effect()
  getCountries() {
    return this.memberApi.getCountries().pipe(
      tap(res => {
        this.countryInfo$.commit(() => res.country_info)
      })
    )
  }
  getCountryCodes() {
    return this.memberApi.getCountryCodes().pipe(
      tap(res => {
        this.countryList$.commit(() => res)
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
    next()
  }
}
