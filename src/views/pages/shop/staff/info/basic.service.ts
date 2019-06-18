import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { StaffApi } from '@/api/v1/staff'
import { ShopStaffApi } from '@/api/v1/staff/staff'

interface BasicState {
    basicInfo: Object
}
@Injectable()
export class BasicService extends Store<BasicState> {
    state$: State<BasicState>
    basicInfo$: Computed<Object>
    constructor(private staffApi: ShopStaffApi) {
      super()
      this.state$ = new State({
        basicInfo: {}
      })
      this.basicInfo$ = new Computed(this.state$.pipe(pluck('basicInfo')))
    }
    getStaffInfo(id: string) {
      return this.staffApi.getStaffInfo(id).pipe(
        tap(res => {
          this.state$.commit(state => {
            state.basicInfo = res.common_info
          })
        })
      )
    }

    beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
      const { id } = to.meta.query
      console.log('basic service')
      this.getStaffInfo(id).subscribe(() => {
        next()
      })
    }
}
