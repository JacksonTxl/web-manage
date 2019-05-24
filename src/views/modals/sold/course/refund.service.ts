import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { CourseApi, RefundCoursePackageInput } from '@/api/v1/sold/course'
import { tap } from 'rxjs/operators'

@Injectable()
export class RefundService {
  packageInfo$ = new State({})
  loading$ = new State({})
  constructor(private courseApi: CourseApi) {}
  @Effect()
  getPackageInfo(id:string) {
    return this.courseApi.getCoursePackageRefundInfo(id).pipe(tap((res:any) => {
      this.packageInfo$.commit(() => res.info)
    }))
  }
  @Effect()
  refund(params: RefundCoursePackageInput, id:string) {
    return this.courseApi.editCoursePackageRefund(params, id)
  }
}
