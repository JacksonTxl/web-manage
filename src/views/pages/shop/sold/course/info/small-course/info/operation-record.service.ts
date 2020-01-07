import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { SmallCourseApi } from '@/api/v1/sold/small-course'
import { tap } from 'rxjs/operators'
@Injectable()
export class OperationRecordService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  constructor(private smallCourseApi: SmallCourseApi) {}
  getList(query: any) {
    return this.smallCourseApi.getSmallCourseOperationInfo(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  beforeEach(to: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
