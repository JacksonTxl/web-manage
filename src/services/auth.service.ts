import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, log } from 'rx-state'
import { tap, pluck, map } from 'rxjs/operators'
import { Store } from './store'
import { AuthApi } from '@/api/v1/common/auth'
import { of } from 'rxjs'

interface AuthState {
  auth: object
}
interface ResDataState {
  list?: any[]
  [propName: string]: any
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
  SET_AUTH(auth: object) {
    this.state$.commit(state => {
      state.auth = auth
    })
  }
  getList() {
    if (Object.keys(this.auth$.snapshot()).length) {
      return of({})
    }
    return this.authApi.getList().pipe(
      tap(res => {
        this.SET_AUTH(res.auth)
      })
    )
  }
  filter(resData: ResDataState) {
    const list = resData.list || []
    if (!list.length) {
      return resData
    }
    const keys: string[] = []
    let newList: object[] = []
    for (let i in list[0].auth) {
      if (/:/.test(i)) {
        keys.push(i)
      }
    }
    this.auth$.subscribe((auth: any) => {
      newList = list.map((item, index) => {
        keys.forEach(key => {
          item.auth[key] = auth.indexOf(key) > -1 && item.auth[key]
        })
        return item
      })
    })
    resData.list = newList
    resData.auth = this.auth$.snapshot()
    console.log('resData', resData)
    return resData
  }
  can(authKey: string) {
    return 1
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.getList()
  }
}
