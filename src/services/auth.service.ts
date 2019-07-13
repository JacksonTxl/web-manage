import { Injectable, ServiceRoute, ServiceRouter } from 'vue-service-app'
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

interface RedirectConfig {
  /**
   * 当前路由名
   */
  locateRouteName: string
  /**
   * 需要跳转的下一级路由
   */
  redirectRouteName: string
  /**
   * to ServiceRoute 对象
   */
  to: ServiceRoute
  /**
   * next 函数
   */
  next: any
}

@Injectable()
export class AuthService {
  auth$ = new State<Array<string>>([])
  constructor(
    private authApi: AuthApi,
    private nprogress: NProgressService,
    private router: ServiceRouter,
    private notification: NotificationService
  ) {
    this.nprogress.SET_TEXT('用户权限数据加载中...')
  }
  getList() {
    return this.authApi.getList().pipe(
      tap((res: any) => {
        this.auth$.commit(() => res.auth || [])
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
    const authSnap = this.auth$.snapshot()
    return 1
  }
  /**
   * 通过map表获取当页的全局权限点
   * @param authMapConfig 需要的权限点对象map表
   */
  authMap(authMapConfig: object = {}) {
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
   * 获取授权的tab数据
   * @return {Computed<{firstRoute:string,tabs:[]}>} 返回流
   */
  getAuthTab$(tabRouteNames: string[]) {
    return new Computed(
      this.auth$.pipe(
        map(() => {
          const authedTabs = tabRouteNames.reduce(
            (res, routeName) => {
              const resolvedRoute = this.router.resolve({
                name: routeName
              })
              const meta = resolvedRoute.route.meta
              if (!meta) {
                return res.concat([])
              }
              if (this.can(meta.auth)) {
                if (!meta.title) {
                  console.error(
                    `[auth.service] 请设置 ${routeName} 下的meta.title `
                  )
                }
                return res.concat([
                  {
                    label: meta.title,
                    route: {
                      name: resolvedRoute.route.name
                    }
                  }
                ])
              }
            },
            [] as any
          )
          return {
            firstRoute: authedTabs[0] ? authedTabs[0].route.name : '',
            tabs: authedTabs
          }
        })
      )
    )
  }
  /**
   * 负责应用内的跳转服务
   * 包括 菜单跳转 tab跳转等
   */
  redirect(redirectConfig: RedirectConfig) {
    const { redirectRouteName, locateRouteName, to, next } = redirectConfig
    const resolveRoute = this.router.resolve({
      name: redirectRouteName
    })
    if (to.name === locateRouteName) {
      // 检测路由表有该路由
      if (resolveRoute.route.matched.length) {
        next({
          name: redirectRouteName,
          query: {
            _t: Math.random()
              .toString(16)
              .slice(3)
          }
        })
      } else {
        this.notification.error({
          title: 'REDIRECT_ERROR',
          content: `未找到匹配路由 ${JSON.stringify(redirectRouteName)}`
        })
        next()
      }
    } else {
      next()
    }
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
