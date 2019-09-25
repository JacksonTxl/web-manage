import { UserService } from './../../../../../services/user.service'
import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap, map } from 'rxjs/operators'
import { GetInitInfoPut, RoleInfo, RoleApi } from '@/api/v1/staff/role'
import { RoleService } from '../role.service'
import { cloneDeep } from 'lodash-es'
@Injectable()
export class AddService {
  loading$ = new State({})
  info$ = new State({})
  shopList$ = new State({})
  brandList$ = new State({})
  dataGrant$ = this.userService.getOptions$('data_grant.data_grant').pipe(
    map(list => {
      let arr = cloneDeep(list)
      const index2Value = arr[2]
      arr[2] = arr[3]
      arr[3] = index2Value
      return arr
    })
  )
  constructor(
    private roleService: RoleService,
    private userService: UserService
  ) {}
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
