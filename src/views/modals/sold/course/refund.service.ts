import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { CourseApi, RefundCourseInput } from '@/api/v1/sold/course'
import { tap } from 'rxjs/operators'

@Injectable()
export class RefundService {
  packageInfo$ = new State({})
  loading$ = new State({})
  constructor(private courseApi: CourseApi) {}
  @Effect()
  getPackageInfo(id:string, type:string) {
    return this.courseApi.getCourseRefundInfo(id, type).pipe(tap((res:any) => {
      this.packageInfo$.commit(() => res.info)
    }))
  }
  @Effect()
  refund(params: RefundCourseInput, id:string, type:string) {
    return this.courseApi.editCourseRefund(params, id, type)
  }
}
