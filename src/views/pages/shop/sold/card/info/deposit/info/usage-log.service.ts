import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CardApi } from '@/api/v1/sold/cards'
import { SoldService } from '@/services/sold.service'

@Injectable()
export class UsageLogService implements Controller {
  list$ = new State({})
  page$ = new State({})
  loading$ = new State({})
  constructor(private cardApi: CardApi, private soldService: SoldService) {}
  @Effect()
  getList(query: any, type: string) {
    return this.cardApi.getDepositUsageLog(query).pipe(
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
