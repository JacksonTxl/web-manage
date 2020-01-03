import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap, map } from 'rxjs/operators'
import { VenueApi, VenueForm, VenueQuery } from '@/api/v1/venue'
import { UserService } from '@/services/user.service'
@Injectable()
export class EditService {
  loading$ = new State({})
  info$ = new State({})
  harfEnums$ = this.userService.getOptions$('venues_reserve.reserve_half_time')
  oneEnums$ = this.userService.getOptions$('venues_reserve.reserve_one_time')
  timeEnums$ = this.userService.getOptions$('venues_reserve.reserve_time')
  constructor(private venueApi: VenueApi, private userService: UserService) {}
  @Effect()
  edit(params: VenueForm) {
    return this.venueApi.editVenue(params)
  }
  getInfo(query: VenueQuery) {
    return this.venueApi.getVenue(query).pipe(
      tap(res => {
        this.info$.commit(() => res.info)
      })
    )
  }

  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    let { area_id } = to.query as any
    return this.getInfo({ id: area_id })
  }
}
