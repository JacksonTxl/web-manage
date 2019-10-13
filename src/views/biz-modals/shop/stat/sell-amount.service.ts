import { Injectable } from 'vue-service-app'
import { UserService } from '@/services/user.service'
import { StatApi } from '@/api/v1/stat/shop'
import { Effect, State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'

@Injectable()
export class SellAmountService {
  amountList$ = new State([])
  modalDepartmentList$ = new State([])
  modalStaffList$ = new State([])
  loading$ = new State({})
  page$ = new State({})
  courseTypeList$ = this.userService.getOptions$('reserve.reserve_type')
  constructor(private statApi: StatApi, private userService: UserService) {}
  @Effect()
  getSellAmountList(params: any) {
    console.log('执行次数');
    console.log(params);
    return this.statApi.getSellAmount(params).pipe(
      tap((res: any) => {
        this.amountList$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  // 筛选部门和员工
  getStallList(params: any) {
    return this.statApi.getStallList().pipe(
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
    console.log('弹窗server请求参数');
    console.log(query);
    return forkJoin(
      this.getStallList(query),
      this.getSellAmountList(query)
    )
  }
}
