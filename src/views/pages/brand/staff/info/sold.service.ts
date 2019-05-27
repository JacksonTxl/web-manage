import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { StaffApi, GetStaffSoldInput } from '@/api/v1/staff'

interface SoldState {
    soldInfo: Object
}
@Injectable()
export class SoldService extends Store<SoldState> {
    state$: State<SoldState>
    soldInfo$: Computed<Object>
    constructor(private staffapi: StaffApi) {
      super()
      this.state$ = new State({
        soldInfo: {}
      })
      this.soldInfo$ = new Computed(this.state$.pipe(pluck('soldInfo')))
    }
    getStaffSoldInfo(id: string, query: GetStaffSoldInput) {
      return this.staffapi.getStaffSold(id, query).pipe(
        tap(res => {
          this.state$.commit(state => {
            state.soldInfo = res.common_info
          })
        })
      )
    }

    beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
      console.log('sold service', to.meta.query)
      const { id } = to.meta.query
      console.log('sold service')
      this.getStaffSoldInfo(id, {

      }).subscribe(() => {
        next()
      })
    }
}
