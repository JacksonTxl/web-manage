import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap, switchMap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { StaffApi } from '../../../../api/v1/staff'
import { GetInitInfoPut, RoleInfo, RoleApi } from '@/api/v1/staff/role'
import { forkJoin } from 'rxjs'
interface SetState {
  info: object,
  roleList: any[],
  initFunRoleList: any[]
}
@Injectable()
export class RoleService extends Store<SetState> {
  state$: State<SetState>
  info$: Computed<Object>
  roleList$: Computed<Object>
  constructor(private roleApi: RoleApi) {
    super()
    this.state$ = new State({
      info: {},
      roleList: [],
      initFunRoleList: []
    })
    this.info$ = new Computed(this.state$.pipe(pluck('info')))
    this.roleList$ = new Computed(this.state$.pipe(pluck('roleList')))
  }
  protected SET_ROLE_INFO(info: GetInitInfoPut) {
    this.state$.commit(state => {
      state.info = info
    })
  }
  /**
     * 获取所有角色列表（角色编辑页面）
     */
  getAllList() {
    return this.roleApi.getAllList().pipe(tap(res => {
      this.state$.commit(state => {
        state.roleList = res.roles
      })
    }))
  }
  /**
     * 获取所有角色列表（角色编辑页面）
     */
  getInitInfo(query: GetInitInfoPut) {
    return this.roleApi.getInitInfo(query)
  }
  /**
     * 获取角色初始化菜单权限树
     */
  getInfo(query: GetInitInfoPut) {
    return this.roleApi.getInfo(query)
  }
  /**
   * 添加角色
   */
  add(params: RoleInfo) {
    return this.roleApi.add(params).pipe(switchMap(state => {
      return this.getAllList()
    }))
  }
  /**
   * 删除角色
   */
  del(params: GetInitInfoPut) {
    return this.roleApi.del(params).pipe(switchMap(state => {
      return this.getAllList()
    }))
  }
  /**
   * 编辑角色
   */
  update(params: RoleInfo) {
    return this.roleApi.update(params).pipe(switchMap(state => {
      return this.getAllList()
    }))
  }
  getInit() {
    return forkJoin(this.getAllList())
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    let { role_id } = to.meta.query as GetInitInfoPut
    this.getInit().subscribe(res => {
      this.SET_ROLE_INFO(res[0])
    })
    next()
  }
}
