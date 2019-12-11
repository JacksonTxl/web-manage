import { Injectable } from 'vue-service-app'
import { UserService } from '@/services/user.service'
import { StatApi } from '@/api/v1/stat/shop'
import { Effect, State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class SellAmountService {
  amountList$ = new State([])
  modalDepartmentList$ = new State([])
  modalStaffList$ = new State([])
  loading$ = new State({})
  page$ = new State({})
  courseTypeList$ = this.userService.getOptions$('reserve.reserve_type')
  auth$ = this.authService.authMap$({
    export: 'shop:stat:cashier_reports|batch_export'
  })
  constructor(
    private statApi: StatApi,
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Effect()
  getSellAmountList(params: any) {
    return this.statApi.getSellAmount(params).pipe(
      tap((res: any) => {
        this.amountList$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  getDepartmentStaffList(params: any) {
    return this.statApi.getDepartmentStaffList().pipe(
      tap((res: any) => {
        this.modalStaffList$.commit(() => {
          return [{ id: -1, name: '所有销售' }, ...res.info.staff_list]
        })
        this.modalDepartmentList$.commit(() => {
          return [{ id: -1, name: '全部部门' }, ...res.info.department_list]
        })
      })
    )
  }
  init(query: any) {
    return forkJoin(
      this.getDepartmentStaffList(query),
      this.getSellAmountList(query)
    )
  }
}
