import { UserService } from '@/services/user.service'
import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { map, tap } from 'rxjs/operators'
import { GetInitInfoPut, RoleInfo } from '@/api/v1/staff/role'
import { RoleService } from '../role.service'
import { MessageService } from '@/services/message.service'
import { cloneDeep } from 'lodash-es'
import { forkJoin } from 'rxjs'
@Injectable()
export class EditService {
  loading$ = new State({})
  info$ = new State({})
  departmentInfo$ = new State({})
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
    private msg: MessageService,
    private userService: UserService
  ) {}
  update(params: RoleInfo) {
    return this.roleService.update(params).pipe(
      tap(res => {
        this.msg.success({ content: '更新成功' })
      })
    )
  }
  gitInitInfo(query: GetInitInfoPut) {
    return this.roleService.getInitInfo(query).pipe(
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
        this.departmentInfo$.commit(() => {
          let departmentInfo = ''
          if (res.role.data_grant === 3) {
            res.role.departments.forEach((element: any) => {
              if (departmentInfo) {
                departmentInfo = departmentInfo + ',' + element.department_name
              } else {
                departmentInfo += element.department_name
              }
            })
          }
          return departmentInfo
        })
      })
    )
  }
  getInit(query: GetInitInfoPut) {
    return forkJoin(this.getInfo(query), this.gitInitInfo(query))
  }

  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    let { roleId } = to.query as any
    return this.getInit({ role_id: roleId })
  }
}
