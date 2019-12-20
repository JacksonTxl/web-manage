import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { SalaryApi } from '@/api/v1/brand/finance/salary'
import { forkJoin } from 'rxjs'
import { tap } from 'rxjs/operators'
import { State, Effect } from 'rx-state'
import { AuthService } from '@/services/auth.service'
import { ShopStaffApi } from '@/api/v1/staff/staff'

@Injectable()
export class ListService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  info$ = new State({})
  department$ = new State([])
  auth$ = this.authService.authMap$({
    add: 'brand:activity:turn|add',
    destory: 'brand:activity:prize|add'
  })
  constructor(
    private authService: AuthService,
    private salaryApi: SalaryApi,
    private shopStaffApi: ShopStaffApi
  ) {}
  @Effect()
  getList(query: any) {
    return this.salaryApi.getList(query).pipe(
      tap(res => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  getDepartmentList() {
    return this.shopStaffApi.searchDepartment().pipe(
      tap((res: any) => {
        this.department$.commit(() => res.department)
      })
    )
  }
  init(query: any) {
    return forkJoin(this.getList(query), this.getDepartmentList())
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
