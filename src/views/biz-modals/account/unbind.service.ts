import { UserApi } from '@/api/v1/account/user'
import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { LoginApi } from '@/api/login'
import { tap } from 'rxjs/operators'

@Injectable()
export class UnbindService {
  loading$ = new State({})
  info$ = new State({})
  constructor(private loginApi: LoginApi, private userApi: UserApi) {}

  getCaptcha(params: any) {
    return this.loginApi.getCaptcha(params)
  }
  fetchUserInfo() {
    return this.userApi.fetchUserInfo().pipe(
      tap(res => {
        this.info$.commit(() => res)
      })
    )
  }
  @Effect()
  bindAccountPhone(params: any) {
    return this.userApi.bindAccountPhone(params)
  }
}
