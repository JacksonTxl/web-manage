import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { VenueApi, RecordQuery, CancelReserveParams } from '@/api/v1/venue'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class RecordService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  constructor(private venueApi: VenueApi, private authService: AuthService) {}
  @Effect()
  getList(query: RecordQuery) {
    return this.venueApi.getRecord(query).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  cancelReserve(params: CancelReserveParams) {
    return this.venueApi.cancelReserve(params)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
