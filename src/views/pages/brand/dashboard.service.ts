import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state/src'
import { pluck, tap } from 'rxjs/operators'
import { StatApi } from '@/api/v1/stat/brand'

interface SetState{
  top: object
}

@Injectable()
export class DashboardService {
  state$: State<SetState>
  top$: Computed<object>
  constructor(private statApi: StatApi) {
    this.state$ = new State({
      top: {}
    })
    this.top$ = new Computed(this.state$.pipe(pluck('top')))
  }
  getTop() {
    return this.statApi.getTop().pipe(tap(res => {
      this.state$.commit(state => {
        state.top = res.info
      })
    }))
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getTop().subscribe(res => {
      next()
    })
  }
}
