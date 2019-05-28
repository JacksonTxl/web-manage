import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { ShopStaffApi, GetListQuery } from '@/api/v1/staff/staff'

interface FollowState {
    stafflist: Object
}
@Injectable()
export class ListService extends Store<FollowState> {
    state$: State<FollowState>
    stafflist$: Computed<Object>
    constructor(private staffApi: ShopStaffApi) {
      super()
      this.state$ = new State({
        stafflist: {}
      })
      this.stafflist$ = new Computed(this.state$.pipe(pluck('stafflist')))
    }
    getStaffList(query: GetListQuery) {
      return this.staffApi.getList(query).pipe(
        tap(res => {
          this.state$.commit(state => {
            state.stafflist = res
          })
        })
      )
    }

    beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
      let { page = 1, size = 20, shop_id } = to.meta.query
      next()
      this.getStaffList({ page, size, shop_id }).subscribe(() => {
        next()
      })
    }
}
