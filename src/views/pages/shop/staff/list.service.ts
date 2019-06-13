import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { ShopStaffApi, GetListQuery } from '@/api/v1/staff/staff'

interface SetState {
    staffList: Object;
    department: Object
}
@Injectable()
export class ListService extends Store<SetState> {
    state$: State<SetState>
    staffList$: Computed<Object>
    department$: Computed<Object>
    constructor(private staffApi: ShopStaffApi) {
      super()
      this.state$ = new State({
        staffList: {},
        department: {}
      })
      this.staffList$ = new Computed(this.state$.pipe(pluck('staffList')))
      this.department$ = new Computed(this.state$.pipe(pluck('department')))
    }
    getStaffList(query: GetListQuery) {
      return this.staffApi.getList(query).pipe(
        tap(res => {
          this.state$.commit(state => {
            state.staffList = res
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
      this.getStaffList({ page, size, ...to.query }).subscribe(() => {
        next()
      })
    }
}
