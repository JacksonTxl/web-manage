import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { GetInitInfoPut, RoleInfo, RoleApi } from '@/api/v1/staff/role'
import { RoleService } from '../role.service'
import { forkJoin } from 'rxjs'
interface SetState {
  info: object
  brandList: any[]
  shopList: any[]
}
@Injectable()
export class AddService extends Store<SetState> {
  state$: State<SetState>
  info$: Computed<object>
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
  gitInitInfo() {
    // 如果是添加角色 初始化角色Id 是 0
    return this.roleService.getInitInfo({ role_id: 0 }).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.brandList = res.brand_list
          state.shopList = res.shop_list
        })
      })
    )
  }
  /**
   * 获取所有角色详情
   */
  @Effect()
  getInfo(query: GetInitInfoPut) {
    return this.roleService.getInfo(query).pipe(
      tap(res => {
        this.SET_ROLE_INFO(res.role)
      })
    )
  }

  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.gitInitInfo().subscribe((res: any) => next())
  }
}
