import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { CabinetApi, LeaseParams } from '@/api/v1/sold/cabinet'
import { tap } from 'rxjs/operators'

@Injectable()
export class ListService implements RouteGuard {
  list$ = new State([]);
  page$ = new State({})
  loading$ = new State({})

  constructor(private cabinetApi: CabinetApi) {}

  beforeEach(to:ServiceRoute, form:ServiceRoute, next:()=>{}) {
    this.getList(to.meta.query).subscribe(() => {
      next()
    })
  }

  @Effect()
  getList(params: LeaseParams) {
    return this.cabinetApi.getLeaseList(params).pipe(tap((res:any) => {
      this.list$.commit(() => res.list)
      this.page$.commit(() => res.page)
    }))
  }
}
