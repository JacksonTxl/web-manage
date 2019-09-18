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
  getList(query: any, type: string) {
    return this.cardApi.getCardsOperationInfo(query, type).pipe(
      tap((res: any) => {
        this.list$.commit(() =>
          res.list.map((item: any) => {
            item.after =
              item.after_operate.length === 0
                ? '--'
                : item.after_operate.join('\r\n')
            item.before =
              item.before_operate.length === 0
                ? '--'
                : item.before_operate.join('\r\n')
            item.object =
              item.operate_object.length === 0
                ? '--'
                : item.operate_object.join('\r\n')
            item.operate_object = item.operate_object.join('')
            item.before_operate = item.before_operate.join('')
            item.after_operate = item.after_operate.join('')
            return item
          })
        )
        this.page$.commit(() => res.page)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query, 'member')
  }
}
