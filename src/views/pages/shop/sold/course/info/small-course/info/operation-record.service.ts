import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { CourseApi } from '@/api/v1/sold/course'
import { tap } from 'rxjs/operators'
import { SoldService } from '@/services/sold.service'
@Injectable()
export class OperationRecordService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  constructor(private courseApi: CourseApi, private soldService: SoldService) {}
  getList(query: any, type: string) {
    return this.courseApi.getCourseOperationInfo(query, type).pipe(
      tap((res: any) => {
        this.list$.commit(() => this.soldService.dealData(res.list))
        this.page$.commit(() => res.page)
      })
    )
  }
  beforeEach(to: ServiceRoute) {
    return this.getList(to.meta.query, 'personal')
  }
}
