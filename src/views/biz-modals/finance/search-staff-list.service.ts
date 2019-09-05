import { State } from 'rx-state'
import { Injectable } from 'vue-service-app'
import { FinanceApi, SalaryBasicQuery } from '@/api/v1/finance'
import { tap } from 'rxjs/operators'

@Injectable()
export class SearchStaffListService {
  list$ = new State([])
  page$ = new State({})
  salaryUsedList$ = new State([])
  salaryUsedPage$ = new State({})
  constructor(private financeApi: FinanceApi) {}
  // TODO: 返回数据有问题，分页有问题
  getSalaryUsedList(id: any, query: SalaryBasicQuery) {
    return this.financeApi.getSearchStaffListSalary(id, query).pipe(
      tap((res: any) => {
        this.salaryUsedList$.commit(() => res.list)
        this.salaryUsedPage$.commit(() => res.page)
      })
    )
  }
  // TODO: 返回数据有问题，分页有问题
  getPerformanceUsedList(id: any, query: SalaryBasicQuery) {
    return this.financeApi.getSearchStaffListPerformance(id, query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list.list)
        this.page$.commit(() => res.list.page)
      })
    )
  }
}
