import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { DataApi, Query } from '@/api/v1/app/venue/data'
import { tap } from 'rxjs/operators'
@Injectable()
export class DataService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  constructor(private dataApi: DataApi) {}
  @Effect()
  getList(query: Query) {
    return this.dataApi.getList(query).pipe(
      tap(res => {
        this.list$.commit(() =>
          res.list.map((item: any, index: any) => {
            return {
              ...item,
              index
            }
          })
        )
        this.page$.commit(() => res.page)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
