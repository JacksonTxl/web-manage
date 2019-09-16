import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CardApi } from '@/api/v1/sold/cards'
import moment from 'moment'

@Injectable()
export class OperationRecordService implements RouteGuard {
  list$ = new State({})
  page$ = new State({})
  loading$ = new State({})
  constructor(private cardApi: CardApi) {}
  @Effect()
  getList(id: string, type: string) {
    return this.cardApi.getCardsOperationInfo(id, type).pipe(
      tap((res: any) => {
        this.list$.commit(() =>
          res.list.map((item: any) => {
            item.operation_time = moment(item.operation_time).format(
              'YYYY-MM-DD HH:mm'
            )
            return item
          })
        )
        this.page$.commit(() => res.page)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query.id, 'member')
  }
}
