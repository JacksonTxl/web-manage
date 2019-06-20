import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap, switchMap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { GetInitInfoPut, RoleInfo, RoleApi } from '@/api/v1/staff/role'
import { RoleService } from '../role.service'
import { forkJoin } from 'rxjs'
interface SetState {
  info: any,
  brandList: any[],
  shopList: any[]
}
@Injectable()
export class InfoService extends Store<SetState> {
  state$: State<SetState>
  info$: Computed<any>
  shopList$: Computed<object>
  brandList$: Computed<object>
  constructor(private roleService: RoleService) {
    super()
    this.state$ = new State({
      info: {},
      brandList: [],
      shopList: []
    })
    this.info$ = new Computed(this.state$.pipe(pluck('info')))
    this.brandList$ = new Computed(this.state$.pipe(pluck('brandList')))
    this.shopList$ = new Computed(this.state$.pipe(pluck('shopList')))
  }
  protected SET_ROLE_INFO(info: RoleInfo) {
    this.state$.commit(state => {
      state.info = info
    })
  }
  gitInitInfo(query: GetInitInfoPut, select_ids: any) {
    return this.roleService.getInitInfo(query).pipe(tap(res => {
      this.state$.commit(state => {
        state.brandList = res.brand_list.filter((item: any) => {
          return select_ids.includes(item.id)
        }).map((item: any) => {
          item.title = item.name
          item.key = item.id
          return item
        })
        state.shopList = res.shop_list.filter((item: any) => {
          return select_ids.includes(item.id)
        }).map((item: any) => {
          item.title = item.name
          item.key = item.id
          return item
        })
      })
    }))
  }
  /**
     * 获取所有角色详情
     */
  @Effect()
  getInfo(query: GetInitInfoPut) {
    return this.roleService.getInfo(query).pipe(tap(res => {
      this.SET_ROLE_INFO(res.role)
    }),
    switchMap(res => {
      return this.gitInitInfo(query, res.role.select_ids)
    }))
  }

  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    let { roleId } = to.query as any
    this.getInfo({ role_id: roleId }).subscribe((res: any) => next())
  }
}
