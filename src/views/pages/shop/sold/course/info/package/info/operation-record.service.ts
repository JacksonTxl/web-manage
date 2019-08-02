import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { CourseApi } from '@/api/v1/sold/course'
import { tap } from 'rxjs/operators'

@Injectable()
export class OperationRecordService implements RouteGuard {
  list$ = new State({})
  page$ = new State({})
  loading$ = new State({})
  constructor(private courseApi: CourseApi) {}
  getList(id: string, type: string) {
    return this.courseApi.getCourseOperationInfo(id, type).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: () => {}) {
    this.getList(to.meta.query.id, 'package').subscribe(() => {
      next()
    })
  }
}
