import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { GetInitInfoPut, RoleInfo } from '@/api/v1/staff/role'
import { RoleService } from '../role.service'
interface SetState {
  info: object
}
@Injectable()
export class InfoService extends Store<SetState> {
  state$: State<SetState>
  info$: Computed<Object>
  constructor(private roleService: RoleService) {
    super()
    this.state$ = new State({
      info: {}
    })
    this.info$ = new Computed(this.state$.pipe(pluck('info')))
  }
  protected SET_ROLE_INFO(info: RoleInfo) {
    this.state$.commit(state => {
      state.info = info
    })
  }
  /**
     * 获取所有角色详情
     */
  @Effect()
  getInfo(query: GetInitInfoPut) {
    return this.roleService.getInfo(query).pipe(tap(res => {
      this.SET_ROLE_INFO(res.role)
    }))
  }

  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    let { roleId } = to.query as any
    this.getInfo({ role_id: roleId }).subscribe(() => next())
  }
}
