import { InfoFixPackageService } from './../../pages/shop/product/course/manage/package/info-fix-package.service'
import { Api } from './../../../api/api'
import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { SignUpApi } from '@/api/v1/marketing/sign-up'

@Injectable()
export class ActivityQrCodeService {
  loading$ = new State({})
  info$ = new State([])
  constructor(private api: SignUpApi) {}
  @Effect()
  getQrCode(activity_id: number) {
    return this.api.getQrCode(activity_id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
}
