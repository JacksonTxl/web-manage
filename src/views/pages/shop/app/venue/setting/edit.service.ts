import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap, map } from 'rxjs/operators'
import { VenueApi, SettingParams, SettingDelQuery } from '@/api/v1/venue'
import { UserService } from '@/services/user.service'
import { ListService } from '../manage/list.service'
@Injectable()
export class EditService {
  loading$ = new State({})
  info$ = new State({})
  sites$ = new State([])
  harfEnums$ = this.userService.getOptions$('venues_reserve.reserve_half_time')
  timeEnums$ = this.userService.getOptions$('venues_reserve.time_limit_type')
  cyclicEnums$ = this.userService.getOptions$('venues_reserve.cyclic_type')
  priorityEnums$ = this.userService.getOptions$('venues_reserve.weight')
  weeks$ = this.userService.getOptions$('venues_reserve.week_day')
  constructor(
    private venueApi: VenueApi,
    private userService: UserService,
    private listService: ListService
  ) {}
  @Effect()
  edit(params: SettingParams) {
    return this.venueApi.editSetting(params)
  }
  getSetting(query: SettingDelQuery) {
    return this.venueApi.getSetting(query).pipe(
      tap(res => {
        this.info$.commit(() => res.info)
      })
    )
  }
  redirect(to: ServiceRoute, from: ServiceRoute, next: any) {
    next({
      name: 'shop-app-venue-manage'
    })
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    const sites: any = this.listService.selectedSites$.snapshot()
    if (sites.length) {
      this.sites$.commit(() => sites)
      let { settings_id } = to.query as any
      this.getSetting({ settings_id }).subscribe(() => {
        next()
      })
    } else {
      this.redirect(to, from, next)
    }
  }
}
