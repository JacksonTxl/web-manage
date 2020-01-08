import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { AppApi, UpdateInput } from '@/api/v1/setting/app'
import { APP_TYPE } from '@/constants/venue'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class BasicSettingService implements Controller {
  info$ = new State({})
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    edit: 'brand:application:venues_reserve|setting_edit'
  })
  constructor(private appApi: AppApi, private authService: AuthService) {}
  getInfo() {
    return this.appApi.getInfo({ application_type: APP_TYPE.VENUES }).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  @Effect()
  update(data: UpdateInput) {
    return this.appApi.update(data)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getInfo()
  }
}
