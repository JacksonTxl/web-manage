import {
  Injectable,
  ServiceRoute,
  ServiceRouter,
  Inject
} from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { tap, map } from 'rxjs/operators'
import { AuthApi } from '@/api/v1/common/auth'
import { of, forkJoin, pipe } from 'rxjs'
import { get, set, forEach } from 'lodash-es'
import { NProgressService } from './nprogress.service'
import { NotificationService } from './notification.service'

interface DataState {
  list?: any[]
  [propName: string]: any
}

@Injectable()
export class AuthService {
  auth$ = new State<Array<string>>([])
  constructor(private authApi: AuthApi, private nprogress: NProgressService) {}
  SET_AUTH(auth: any[]) {
    this.auth$.commit(() => auth)
  }
  getList() {
    return this.authApi.getList().pipe(
      tap((res: any) => {
        this.SET_AUTH(get(res, 'auth', []))
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
    // console.log('filtered data by authService: ', data)
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
    const authSnap = this.auth$.snapshot()
    return 1
  }
  /**
   * 通过map表获取当页的全局权限点
   * @param authMapConfig 需要的权限点对象map表
   */
  authMap$(authMapConfig: object = {}) {
    return new Computed(
      this.auth$.pipe(
        map(authList => {
          const _authMap: any = {}
          forEach(authMapConfig, (v, k) => {
            _authMap[k] = authList.includes(v)
          })
          return _authMap
        })
      )
    )
  }
  tabCan(s: string) {
    return 1
  }
  init() {
    if (!this.auth$.snapshot().length) {
      return forkJoin([this.getList()]).pipe(
        tap(() => {
          this.nprogress.SET_TEXT('用户权限数据获取完成')
        })
      )
    } else {
      return of([])
    }
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init()
  }
}
