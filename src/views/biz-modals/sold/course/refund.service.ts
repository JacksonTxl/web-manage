import { UserService } from '@/services/user.service'
import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { CourseApi, RefundCourseInput } from '@/api/v1/sold/course'
import { tap } from 'rxjs/operators'

@Injectable()
export class RefundService {
  packageInfo$ = new State({})
  loading$ = new State({})
  refundChannelSaas$ = this.userService.getOptions$('sold.refund_channel_saas')
  refundReasons$ = this.userService.getOptions$('sold.refund_reason')
  constructor(private courseApi: CourseApi, private userService: UserService) {}
  @Effect()
  getPackageInfo(id: string, type: string) {
    return this.courseApi.getCourseRefundInfo(id, type).pipe(
      tap((res: any) => {
        this.packageInfo$.commit(() => res.info)
      })
    )
  }
  @Effect()
  refund(params: RefundCourseInput, id: string, type: string) {
    return this.courseApi.editCourseRefund(params, id, type)
  }
}
