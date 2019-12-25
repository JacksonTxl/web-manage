import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { CabinetApi, RefundParams } from '@/api/v1/sold/cabinet'
import { tap } from 'rxjs/operators'
import { UserService } from '@/services/user.service'

@Injectable()
export class RefundService {
  info$ = new State({})
  loading$ = new State({})
  refundChannelSaas$ = this.userService.getOptions$(
    'sold_common.refund_channel_saas'
  )
  refundReasons$ = this.userService.getOptions$('sold_common.refund_reason')
  constructor(
    private cabinetApi: CabinetApi,
    private userService: UserService
  ) {}
  getDetail(id: number) {
    return this.cabinetApi.getDetail(id, 'refund').pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  @Effect()
  refund(params: RefundParams) {
    return this.cabinetApi.refund(params)
  }
}
