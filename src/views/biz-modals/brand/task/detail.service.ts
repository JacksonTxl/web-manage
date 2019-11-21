import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { TaskApi } from '@/api/v1/brand/task'
import { tap } from 'rxjs/operators'

@Injectable()
export class DetailService {
  loading$ = new State({})
  list$ = new State([])
  page$ = new State({
    current_page: 1,
    size: 20,
    total_counts: 1,
    total_pages: 1
  })
  constructor(private taskApi: TaskApi) {}
  @Effect()
  getDetailList(query: any) {
    return this.taskApi.getDetailList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
}
