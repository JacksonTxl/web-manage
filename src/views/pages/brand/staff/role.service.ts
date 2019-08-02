import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state'
import { tap, switchMap } from 'rxjs/operators'
import { GetInitInfoPut, RoleInfo, RoleApi } from '@/api/v1/staff/role'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class RoleService implements RouteGuard {
  roleList$ = new State([])
  stat$ = new State({})
  auth$ = this.authService.authMap$({
    add: 'brand:auth:role|add',
    del: 'brand:auth:role|del',
    edit: 'brand:auth:role|edit'
  })
  constructor(private roleApi: RoleApi, private authService: AuthService) {}
  /**
   * 获取所有角色列表（角色编辑页面）
   */
  getAllList() {
    return this.roleApi.getAllList().pipe(
      tap(res => {
        this.roleList$.commit(() => res.roles)
        this.stat$.commit(() => res.stat)
      })
    )
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
    return this.roleApi.add(params).pipe(
      switchMap(state => {
        return this.getAllList()
      })
    )
  }
  /**
   * 删除角色
   */
  del(params: GetInitInfoPut) {
    return this.roleApi.del(params).pipe(
      switchMap(state => {
        return this.getAllList()
      })
    )
  }
  /**
   * 编辑角色
   */
  update(params: RoleInfo) {
    return this.roleApi.update(params).pipe(
      switchMap(state => {
        return this.getAllList()
      })
    )
  }

  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.getAllList()
  }
}
