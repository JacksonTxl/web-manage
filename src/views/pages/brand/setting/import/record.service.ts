import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { ImportApi, ListParams } from '@/api/v1/setting/import/import'

@Injectable()
export class RecordService implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  constructor(private importApi: ImportApi) {}
  @Effect()
  getList(query: ListParams) {
    return this.importApi.excelList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
