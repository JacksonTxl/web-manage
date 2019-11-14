import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { TaskApi } from '@/api/v1/setting/task'
import { tap, map } from 'rxjs/operators'

@Injectable()
export class ListService implements Controller {
  loading$ = new State({})
  list$ = new State([])
  page$ = new State({})
  last_updated_time$ = new State('')
  constructor(private taskApi: TaskApi) {}
  @Effect()
  getList(query: any) {
    return this.taskApi.getList(query).pipe(
      tap((res: any) => {
        this.last_updated_time$.commit(() => res.last_updated_time)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  beforeEach(to: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
