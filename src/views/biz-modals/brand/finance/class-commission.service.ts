import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { SalaryApi } from '@/api/v1/brand/finance/salary'
import { tap } from 'rxjs/operators'
import { UserService } from '@/services/user.service'

@Injectable()
export class ClassCommissionService {
  loading$ = new State({})
  list$ = new State([])
  info$ = new State({})
  page$ = new State({
    current_page: 1,
    size: 20,
    total_counts: 1,
    total_pages: 1
  })
  courseTypeList$ = this.userService.getOptions$('schedule.course_type')
  constructor(private salaryApi: SalaryApi, private userService: UserService) {}
  @Effect()
  getList(query: any) {
    return this.salaryApi.getClassCommissionList(query).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
}
