import { Api } from './../../../api/api'
import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { SignUpApi } from '@/api/v1/marketing/sign-up'
import { UserService } from '@/services/user.service'

@Injectable()
export class SharePosterService {
  loading$ = new State({})
  info$ = new State({})
  qrcode$ = new State({})
  brand$ = this.userService.brand$
  constructor(private api: SignUpApi, private userService: UserService) {}
  @Effect()
  getSharePosterInfo(activity_id: number) {
    return this.api.getSharePosterInfo(activity_id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  @Effect()
  getQrCode(activity_id: number) {
    return this.api.getQrCode(activity_id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
}
