import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, log } from 'rx-state'
import { tap, pluck, map } from 'rxjs/operators'
import { Store } from './store'
import { AuthApi } from '@/api/v1/common/auth'
import { of, forkJoin } from 'rxjs'
import { get, set } from 'lodash-es'
import { NProgressService } from './nprogress.service'

interface AuthState {
  auth: object
}
interface DataState {
  list?: any[]
  [propName: string]: any
}
@Injectable()
export class AuthService extends Store<AuthState> {
  state$: State<AuthState>
  auth$: Computed<object>
  constructor(private authApi: AuthApi, private nprogress: NProgressService) {
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
      tap((res: any) => {
        this.SET_AUTH(res.auth)
      })
    )
  }
  /**
   *
   * @param data
   * @param key
   * 示例:
   * authService.filter(data)
   * authService.filter(data, 'list2')
   * authService.filter(data, 'auth')
   * authService.filter(data, 'info.auth')
   */
  filter(data: DataState, key: string = 'list') {
    if (/auth$/.test(key)) {
      data = this.objectAuthFilter(data, key)
    } else {
      data = this.listAuthFilter(data, key)
    }
    console.log('filtered data by authService: ', data)
    return data
  }
  /**
   * 处理 list
   */
  private listAuthFilter(data: any, key = 'list') {
    const auth: any = this.auth$.snapshot()
    const list = data[key] || []
    if (!list.length) {
      return data
    }
    const keys: string[] = []
    let newList: object[] = []
    for (let i in list[0].auth) {
      if (/:/.test(i)) {
        keys.push(i)
      }
    }
    newList = list.map((item: any, index: any) => {
      keys.forEach(key => {
        item.auth[key] = auth.indexOf(key) > -1 && item.auth[key]
      })
      return item
    })
    data.list = newList
    return data
  }
  /**
   * 处理特殊的 auth 对象
   */
  private objectAuthFilter(data: any, key = 'auth') {
    const auth: any = this.auth$.snapshot()
    const authObj = get(data, key)
    for (let i in authObj) {
      authObj[i] = auth.indexOf(i) > -1 && authObj[i]
    }
    set(data, key, authObj)
    return data
  }
  can(authKey: string) {
    return 1
  }
  init() {
    return forkJoin([this.getList()])
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init().pipe(
      tap(() => {
        this.nprogress.next('权限服务加载完毕')
      })
    )
  }
}
