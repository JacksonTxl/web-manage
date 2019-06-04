import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { StaffApi } from '../../../../api/v1/staff'
import { GetInitInfoPut, RoleInfo, RoleApi } from '@/api/v1/staff/role'
import { forkJoin } from 'rxjs'
interface SetState {
  info: object
}
@Injectable()
export class RoleService extends Store<SetState> {
  state$: State<SetState>
  info$: Computed<Object>
  constructor(private roleApi: RoleApi) {
    super()
    this.state$ = new State({
      info: {}
    })
    this.info$ = new Computed(this.state$.pipe(pluck('info')))
  }
  protected SET_ROLE_INFO(info: GetInitInfoPut) {
    this.state$.commit(state => {
      state.info = info
    })
  }
  /**
   * 获取普通员工所有角色列表
   */
  getNormalList() {
    return this.roleApi.getNormalList()
  }
  /**
     * 获取所有角色列表（角色编辑页面）
     */
  getAllList() {
    return this.roleApi.getAllList()
  }
  /**
     * 获取所有角色列表（角色编辑页面）
     */
  getInitInfo(query: GetInitInfoPut) {
    return this.roleApi.getInitInfo(query)
  }
  /**
     * 获取所有角色列表（角色编辑页面）
     */
  getInfo(query: GetInitInfoPut) {
    return this.roleApi.getInfo(query)
  }
  /**
   * 添加角色
   */
  add(params: RoleInfo) {
    this.roleApi.add(params)
  }
  /**
   * 删除角色
   */
  del(params: GetInitInfoPut) {
    this.roleApi.del(params)
  }
  /**
   * 编辑角色
   */
  update(params: RoleInfo) {
    this.roleApi.update(params)
  }
  getInit() {
    return forkJoin(this.getAllList(), this.getInfo({ role_id: '1' }), this.getInitInfo({ role_id: '1' }), this.getNormalList())
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    let { role_id } = to.meta.query as GetInitInfoPut || 1
    this.getInit().subscribe(res => {
      this.SET_ROLE_INFO(res[1])
    })
    next()
  }
}
