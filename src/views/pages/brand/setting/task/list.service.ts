import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { TaskApi } from '@/api/v1/brand/task'
import { tap, map } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class ListService implements Controller {
  loading$ = new State({})
  list$ = new State([])
  page$ = new State({})
  last_updated_time$ = new State('')
  constructor(private taskApi: TaskApi, private authService: AuthService) {}
  @Effect()
  getList(query: any) {
    return this.taskApi.getList(query).pipe(
      tap((res: any) => {
        this.last_updated_time$.commit(() => res.last_updated_time)
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  /**
   * 终止任务
   * @param taskId
   */
  stopTask(taskId: any) {
    return this.taskApi.stopTask(taskId)
  }
  beforeEach(to: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
