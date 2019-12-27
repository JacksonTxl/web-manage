import { UserService } from '@/services/user.service'
import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { SmallCourseApi } from '@/api/v1/sold/small-course'
import { tap } from 'rxjs/operators'

@Injectable()
export class RefundService {
  info$ = new State({})
  loading$ = new State({})
  refundChannelSaas$ = this.userService.getOptions$(
    'sold_common.refund_channel_saas'
  )
  refundReasons$ = this.userService.getOptions$(
    'sold_common.refund_reason_small_course'
  )
  constructor(
    private smallCourseApi: SmallCourseApi,
    private userService: UserService
  ) {}
  @Effect()
  getInfo(id: string) {
    return this.smallCourseApi.getRefundSmallCourseInfo(id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  @Effect()
  refund(params: any, id: string) {
    return this.smallCourseApi.smallCourseRefund(params, id)
  }
}
