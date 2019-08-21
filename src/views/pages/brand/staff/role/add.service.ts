import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { GetInitInfoPut, RoleInfo, RoleApi } from '@/api/v1/staff/role'
import { RoleService } from '../role.service'
@Injectable()
export class AddService {
  loading$ = new State({})
  info$ = new State({})
  shopList$ = new State({})
  brandList$ = new State({})
  constructor(private roleService: RoleService) {}
  gitInitInfo() {
    // 如果是添加角色 初始化角色Id 是 0
    return this.roleService.getInitInfo({ role_id: 0 }).pipe(
      tap(res => {
        this.brandList$.commit(() => res.brand_list)
        this.shopList$.commit(() => res.shop_list)
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
        this.info$.commit(() => res.role)
      })
    )
  }

  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.gitInitInfo()
  }
}
