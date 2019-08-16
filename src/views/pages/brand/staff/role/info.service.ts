import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap, switchMap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { GetInitInfoPut, RoleInfo, RoleApi } from '@/api/v1/staff/role'
import { RoleService } from '../role.service'
import { forkJoin } from 'rxjs'
@Injectable()
export class InfoService {
  loading$ = new State({})
  info$ = new State({})
  shopList$ = new State({})
  brandList$ = new State({})
  constructor(private roleService: RoleService) {}
  gitInitInfo(query: GetInitInfoPut, select_ids: any) {
    return this.roleService.getInitInfo(query).pipe(
      tap(res => {
        this.brandList$.commit(state => {
          return res.brand_list
            .filter((item: any) => {
              return select_ids.includes(item.id)
            })
            .map((item: any) => {
              item.title = item.name
              item.key = item.id
              return item
            })
          this.shopList$.commit(() => {
            return res.shop_list
              .filter((item: any) => {
                return select_ids.includes(item.id)
              })
              .map((item: any) => {
                item.title = item.name
                item.key = item.id
                return item
              })
          })
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
        this.info$.commit(() => res.role)
      }),
      switchMap(res => {
        return this.gitInitInfo(query, res.role.select_ids)
      })
    )
  }

  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    let { id } = to.query as any
    return this.getInfo({ role_id: id })
  }
}
