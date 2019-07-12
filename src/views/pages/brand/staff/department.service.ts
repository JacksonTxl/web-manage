import { DepartmentService as DepService } from './department.service#/department.service'
import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap, switchMap } from 'rxjs/operators'
import { StaffApi, Params, UpdateDepartmentInput, DelDepartmentInput, AddDepartmentInput } from '@/api/v1/staff'
import { ShopStaffApi } from '@/api/v1/staff/staff'
import { AuthService } from '@/services/auth.service'
import { forkJoin } from 'rxjs'
import { MessageService } from '@/services/message.service'

@Injectable()
export class DepartmentService implements RouteGuard {
  staffList$ = new State([])
  page$ = new State({})
  auth$ = this.authService.authMap({
    join: 'brand_shop:staff:staff|join',
    add: 'brand_shop:staff:staff|add',
    import: 'brand_shop:staff:staff|import',
    departmentAdd: 'brand:auth:department|add',
    departmentDel: 'brand:auth:department|del',
    departmentEdit: 'brand:auth:department|edit'
  })
  departmentList$ = new State([])
  departmentSearchList$ = new State([])
  loading$ = new State({})
  constructor(private staffApi: StaffApi, private msg: MessageService, private shopStaffApi: ShopStaffApi, private depService: DepService, private authService: AuthService) {}
  @Effect()
  getStaffList(data: Params) {
    return this.staffApi.getStaffBrandList(data).pipe(tap(res => {
      this.authService.filter(res)
      this.staffList$.commit(() => res.list)
      this.page$.commit(() => res.page)
    }))
  }
  getDepartmentList() {
    return this.depService.getDepartmentList().pipe(tap(res => {
      this.departmentList$.commit(() => res.department)
    }))
  }
  addDepartment(params: AddDepartmentInput) {
    return this.staffApi.addDepartment(params).pipe(tap(res => {
      this.msg.success({
        content: '添加成功！！！'
      })
    }))
  }
  updateDepartment(params: UpdateDepartmentInput) {
    return this.staffApi.updateDepartment(params).pipe(tap(res => {
      this.msg.success({
        content: '修改成功！！！'
      })
    }))
  }
  delDepartment(params: DelDepartmentInput) {
    return this.staffApi.delDepartment(params).pipe(tap(res => {
      this.msg.success({
        content: '部门已删除'
      })
    }))
  }
  searchDepartment(keyword: string) {
    return this.shopStaffApi.searchDepartment({
      keyword: keyword
    }).pipe(tap(res => {
      this.departmentSearchList$.commit(() => res.department)
    }))
  }
  init(query: any) {
    return forkJoin(this.searchDepartment(''), this.getDepartmentList(), this.getStaffList(query))
  }
  // beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
  //   return this.getDepartmentList()
  // }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.query)
  }
}
