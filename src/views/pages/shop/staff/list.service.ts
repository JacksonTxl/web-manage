import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { ShopStaffApi, GetListQuery } from '@/api/v1/staff/staff'

interface FollowState {
    stafflist: Object;
    department: Object
}
@Injectable()
export class ListService extends Store<FollowState> {
    state$: State<FollowState>
    stafflist$: Computed<Object>
    department$: Computed<Object>
    constructor(private staffApi: ShopStaffApi) {
      super()
      this.state$ = new State({
        stafflist: {},
        department: {}
      })
      this.stafflist$ = new Computed(this.state$.pipe(pluck('stafflist')))
      this.department$ = new Computed(this.state$.pipe(pluck('department')))
    }
    getStaffList(query: GetListQuery) {
      return this.staffApi.getList(query).pipe(
        tap(res => {
          res.list[0].identity = [1, 2, 3]
          this.state$.commit(state => {
            state.stafflist = res
          })
        })
      )
    }

    getStaffDepartment() {
      return this.staffApi.getStaffDepartmentList().pipe(
        tap(res => {
          this.state$.commit(state => {
            state.department = res.department
          })
        })
      )
    }

    beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
      let { page = 1, size = 20, shop_id } = to.meta.query
      this.getStaffDepartment().subscribe(() => {})
      this.getStaffList({ page, size, shop_id }).subscribe(() => {
        next()
      })
    }
}
