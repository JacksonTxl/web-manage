import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { SalaryApi } from '@/api/v1/brand/finance/salary'
import { tap } from 'rxjs/operators'

@Injectable()
export class SaleCommissionService {
  loading$ = new State({})
  list$ = new State([])
  info$ = new State({})
  page$ = new State({
    current_page: 1,
    size: 20,
    total_counts: 1,
    total_pages: 1
  })
  constructor(private salaryApi: SalaryApi) {}
  @Effect()
  getList(query: any) {
    return this.salaryApi.getSaleCommissionList(query).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
}
