import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap, map } from 'rxjs/operators'
import { VenueApi, VenueForm } from '@/api/v1/venue'
import { UserService } from '@/services/user.service'
@Injectable()
export class AddService {
  loading$ = new State({})
  info$ = new State({})
  harfEnums$ = this.userService.getOptions$('venues_reserve.reserve_half_time')
  oneEnums$ = this.userService.getOptions$('venues_reserve.reserve_one_time')
  timeEnums$ = new State([
    { label: '半小时', value: 1 },
    { label: '一小时', value: 2 }
  ])
  constructor(private venueApi: VenueApi, private userService: UserService) {}
  @Effect()
  add(params: VenueForm) {
    return this.venueApi.addVenue(params)
  }
}
