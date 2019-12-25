import { Injectable, Dictionary, ServiceRouter } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { tap, map } from 'rxjs/operators'
import { AuthApi } from '@/api/v1/common/auth'
import { get, set, forEach, pick } from 'lodash-es'
import { NProgressService } from './nprogress.service'
import { NotificationService } from './notification.service'
import { UserService } from './user.service'

interface DataState {
  list?: any[]
  [propName: string]: any
}

interface AuthTabConfig {
  /**
   * 需要附加的query参数字段数组
   */
  withQuery: string[]
}

@Injectable()
export class AuthService {
  auth$ = new State<Array<string>>([])
  authedTabMap$ = new State<Dictionary<any>>({})

  constructor(
    private authApi: AuthApi,
    private nprogress: NProgressService,
    private notification: NotificationService,
    private userService: UserService,
    private router: ServiceRouter
  ) {}
  SET_AUTH(auth: any[]) {
    this.auth$.commit(() => auth)
  }
  UPDATE_AUTHED_TAB_MAP(key: string, authedTabs: any[]) {
    this.authedTabMap$.commit(prevTabMap => {
      prevTabMap[key] = authedTabs
    })
  }
  fetchList() {
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
  /**
   * 校验某权限是否在全局下拥有
   */
  can(authKey: string) {
    const authSnap = this.auth$.snapshot()
    return authSnap.includes(authKey)
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
  /**
   * 通过路由名称获取授权的tabs数组对象
   * @param routeName 路由名称
   * @param AuthTabConfig 选项
   */
  getAuthTabs$(
    routeName: string,
    config: AuthTabConfig = {
      withQuery: []
    }
  ) {
    return new Computed(
      this.authedTabMap$.pipe(
        map(authMap => {
          if (!(routeName in authMap)) {
            this.notification.error({
              title: 'GET_AUTH_TABS_ERROR',
              content: `不存在 ${routeName} 下的tabs`
            })
          }
          return authMap[routeName]
        }),
        map(authTabs => {
          return authTabs.map((tab: any) => {
            tab.route.query = pick(this.router.to.query, config.withQuery)
            return tab
          })
        })
      )
    )
  }
  /**
   * 通过路由名称计算可用的权限路由数组
   * @param tabs 需要计算权限的tabs数组
   */
  calcAuthedTabsByTabs(tabs: string[]): string[] {
    const authedTabs = [] as any[]
    tabs.forEach(routeName => {
      const resolvedRoute = this.router.resolve({
        name: routeName
      })
      // 查找对应的route下的auth权限点
      const meta = resolvedRoute.route.meta
      if (!meta) {
        return
      }
      const tab = {
        label: this.userService.interpolation(meta.title),
        route: {
          name: resolvedRoute.route.name
        }
      }
      if (!meta.title) {
        console.warn(`[auth.service] 请配置 ${routeName} 下的meta.title 标题`)
        authedTabs.push(tab)
        return
      }
      if (!meta.auth) {
        console.warn(
          `[auth.service] 请配置 ${routeName} 下的meta.auth 权限点，默认显示 `
        )
        authedTabs.push(tab)
        return
      }
      /**
       * 没有配置 直接显示
       */
      if (!meta.auth) {
        authedTabs.push(tab)
      } else {
        if (this.can(meta.auth)) {
          authedTabs.push(tab)
        }
      }
    })
    console.log('[auth.service] authedTabs', authedTabs)
    return authedTabs
  }
}
