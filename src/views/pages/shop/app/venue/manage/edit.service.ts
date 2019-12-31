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
  // timeEnums$ = this.userService.getOptions$('')
  timeEnums$ = new State([
    { label: '半小时', value: 1 },
    { label: '一小时', value: 2 }
  ])
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
    let { id } = to.query as any
    return this.getInfo({ id: id })
  }
}
