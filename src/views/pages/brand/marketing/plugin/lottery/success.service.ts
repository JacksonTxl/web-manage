import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { SignUpApi } from '@/api/v1/marketing/sign-up'
import { UserService } from '@/services/user.service'
import { LotteryApi } from '@/api/v1/marketing/lottery'

@Injectable()
export class SuccessService {
  loading$ = new State({})
  info$ = new State({})
  qrcode$ = new State({})
  brand$ = this.userService.brand$
  constructor(private api: LotteryApi, private userService: UserService) {}
  @Effect()
  getSharePosterInfo(lottery_id: number) {
    return this.api.getPosterInfo(lottery_id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  @Effect()
  getQrCode(lottery_id: number) {
    return this.api.getQrcode(lottery_id).pipe(
      tap((res: any) => {
        this.qrcode$.commit(() => res.qrcode)
      })
    )
  }
}
