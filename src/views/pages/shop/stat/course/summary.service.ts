import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { StatApi, OrderShopListQuery } from '@/api/v1/stat/shop'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class SummaryService {
  list$ = new State([])
  page$ = new State({})
  total$ = new State({})
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    export: 'shop:stat:class_reports|export_summary'
  })
  constructor(private statApi: StatApi, private authService: AuthService) {}
  @Effect()
  getCourseList(query: OrderShopListQuery) {
    return this.statApi.getCourseList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
        this.total$.commit(() => res.total)
      })
    )
  }
  @Effect()
  init(query: any) {
    return forkJoin(this.getCourseList(query))
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
