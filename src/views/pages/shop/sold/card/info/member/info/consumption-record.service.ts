import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { tap } from 'rxjs/operators'
import { CardApi } from '@/api/v1/sold/cards'

@Injectable()
export class ConsumptionRecordService implements RouteGuard {
  list$ = new State({})
  page$ = new State({})
  loading$ = new State({})
  constructor(private cardApi: CardApi) {}
  @Effect()
  getList(id:string, type:string) {
    return this.cardApi.getCardsConsumeInfo(id, type).pipe(tap((res:any) => {
      this.list$.commit(() => res.list)
      this.page$.commit(() => res.page)
    }))
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next:()=>{}) {
    this.getList(to.meta.query.id, 'member').subscribe(() => {
      next()
    })
  }
}
