import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, log } from 'rx-state'
import { tap, pluck, map } from 'rxjs/operators'
import { Store } from './store'
import { AuthApi, CheckInput } from '@/api/v1/common/auth'
import { of } from 'rxjs'

interface AuthState {
  auth: object
}
@Injectable()
export class AuthService extends Store<AuthState> {
  state$: State<AuthState>
  auth$: Computed<object>
  constructor(
    private authApi: AuthApi
  ) {
    super()
    const initialState = {
      auth: {}
    }
    this.state$ = new State(initialState)
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  SET_AUTH_LIST(auth: object) {
    this.state$.commit(state => {
      state.auth = auth
    })
  }
  getAuth(params: CheckInput) {
    if (!params.auth_list.length || Object.keys(this.auth$.snapshot()).length) {
      return of({})
    }
    return this.authApi.check(params).pipe(
      tap(res => {
        this.SET_AUTH_LIST(res)
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: Function) {
    const authList = to.meta.authList || []
    this.getAuth({
      auth_list: authList
    }).subscribe(() => {
      next()
    })
  }
}
