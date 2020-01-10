import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CardApi } from '@/api/v1/sold/cards'

@Injectable()
export class UsageLogService implements Controller {
  list$ = new State({})
  page$ = new State({})
  loading$ = new State({})
  constructor(private cardApi: CardApi) {}
  @Effect()
  getList(query: any, type: string) {
    return this.cardApi.getCardsUsageLog(query, type).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  beforeEach(to: ServiceRoute) {
    return this.getList(to.meta.query, 'member')
  }
}
