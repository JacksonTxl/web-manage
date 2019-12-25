import { State, Effect } from 'rx-state'
import { NotifyApi } from './../../../../api/v1/notify'
import { Injectable, ServiceRoute } from 'vue-service-app'
import { tap } from 'rxjs/operators'

@Injectable()
export class InformService {
  loading$ = new State({})
  list$ = new State([{}])
  page$ = new State({})
  constructor(private api: NotifyApi) {}
  getList(query: any) {
    return this.api.getInformList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  beforeEach(to: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
