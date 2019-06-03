import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { ManageApi, ManagePhoneInput } from '@/api/v1/account/manage'
import { LoginApi, LoginAccountInput } from '@/api/login'
import { TokenService } from '@/services/token.service'

interface StaffState {
  name: string
  age: number
}
@Injectable()
export class LoginService extends Store<StaffState> {
  state$: State<StaffState>
  name$: Computed<string>
  constructor(
    private loginApi: LoginApi,
    private tokenService: TokenService
  ) {
    super()
    this.state$ = new State({
      name: 'lee',
      age: 33
    })
    this.name$ = new Computed(this.state$.pipe(pluck('name')))
  }
  @Effect()
  loginAccount(data: LoginAccountInput) {
    return this.loginApi.loginAccount(data).pipe(
      tap(res => {
        this.tokenService.SET_TOKEN(res.token)
      })
    )
  }
  beforeRouteEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    next()
  }
}
